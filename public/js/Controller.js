function getGen() {
    let dims = parseInt(document.getElementById("Dimension").value);
	vista.setMessage("Generando Laberinto");
	modelo.startMaze(dims,vista.tamC,(vista.tamC * dims)-vista.tamC);
	vista.activate(false);
    /*fetch("/generar/" + dims, {
            method: "GET"
        }) //hace peticion por ajax, pide generar laberinto al server
        .then((response) => {
            return (response.status === 200) ? response.json() : "Not 200";
        }) //revisa la respuesta del servidor para ver si es correcta
        .then(obj => {
            modelo.setModel(JsonToMaze(obj));
            vista.setMessage("Generado desde Server");
        }) //asigna el div asociado con el resultado de la solicitud (para debugging)
        .catch(err => {
            vista.setMessage("No hay conexion con el servidor, generado localmente");
            modelo.startMaze(dims,vista.tamC,(vista.tamC * dims)-vista.tamC);
        }); //situacion en caso de no conexion
	*/
}

function postSave() { //hace peticion de guardado de una partida  del laberinto 
    let name = document.getElementById('name').value; //obtiene nombre de la partida
	let savedgame = mazeToJson(modelo.matriz);
	modelo.setModel(JsonToMaze(savedgame));
    fetch("/guardar/" + name, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: savedgame
        }) //inicia solicitud de guardado
        .then(response => {
            return (response.status === 200) ? response.text() : 'No encontrado en server, procediendo a guardado local';
        }) //analiza respuesta del servidor
        .then(obj => {
            vista.setMessage(obj);
        }) //muestra el resultado en el browser
        .catch(function error(err) {
            savingLocaly(name,savedgame);
        }); //caso sin conexion guarda en localstorage
	//savingLocaly(name);
}

function getLoad() {
    let name = document.getElementById('name').value;
    fetch("/cargar/" + name, {
            method: "GET"
        })
        .then((response) => {
            return (response.status === 200) ?(vista.setMessage("Cargado desde Server"),response.json()):(vista.setMessage("Partida no encontrada en el servidor"),loadingLocaly(name));
        })
        .then(obj => {
            modelo.setModel(JsonToMaze(obj));
			vista.activate(false);
        })
        .catch((err) => {
            loadingLocaly(name);
			vista.activate(false);
        }); //caso sin conexion carga desde localstorage
}


function savingLocaly(name,savedgame) { //en caso de no haber conexion al servidor
    vista.setMessage("Intentando Guardar Localmente...");
    localStorage[name] = JSON.stringify(savedgame);
	vista.setMessage('Guardado localmente exitosamente');
}

function loadingLocaly(name) { // en caso de no haber conexion al servidor 
    vista.setMessage("Intentando Cargar Localmente...");	
	localStorage[name]?vista.setMessage('Partida local encontrada'):vista.setMessage('No hay partida local con ese nombre');
	modelo.setModel(JsonToMaze(JSON.parse(localStorage[name])));
    (modelo.matriz) ?vista.setMessage('Cargado localmente'): vista.setMessage('No se pudo cargar localmente');
}

//Método que desplaza al jugador por el laberinto.
function controlCases(e){
	let next = null, num, boton, check;
	let controlSwitch = new mySwitch([
		() => {next=modelo.actual.oeste; num=4;},
		() => {next=modelo.actual.norte;num=1;},
		() => {next=modelo.actual.este;num=2;},
		() => {next=modelo.actual.sur;num=3;}
	]);	
	boton = (e.keyCode)-37;
	(0<=boton && boton<=4) ? controlSwitch.getFunction(boton)() : true;//Decorar luego!!!
	if(next&&!modelo.winner){
		check = modelo.actual.conexiones.some((e) => {
			if(e==num){
				vista.mark(modelo.actual.ejeX, modelo.actual.ejeY, next.ejeX, next.ejeY, modelo.actual.tamanyo, "white");
				return true;
			}
			else
				return false;
		});
		
		if(check){
			(next.nodoFinal) ? (modelo.winner=true,vista.declareWinner()) : modelo.actual=next;
		}
		else{
			//sonido de choque contra pared...
			alert("No hay camino.");
		}
	}
}

function autoControl(){
	vista.deactivate();
	modelo.actual = modelo.matriz.control;
	let solucion = reverse(modelo.matriz.solucion);
	let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));	
	function autoMovement(next, solution){
		let nS = myPop(solution);
		vista.mark(modelo.actual.ejeX, modelo.actual.ejeY, next.ejeX, next.ejeY, modelo.actual.tamanyo, "grey");
		modelo.actual = next;
		(next.nodoFinal) ? (vista.activate(true),vista.declareWinner()) : sleep(500).then(() => autoMovement(next.go(nS[1]), nS[0]));
	}
	let newSolution = myPop(solucion);
	modelo.winner = true;
	sleep(500).then(() => autoMovement(modelo.actual.go(newSolution[1]), newSolution[0]));
}

window.onload = () => {
	document.getElementById("Solucion").disabled = true;	
	let leCanvas = document.getElementById("Panel");
	vista = new View(leCanvas,50);
	vista.createListeners();	
	modelo = new Model();
	document.getElementById("Solucion").addEventListener('click',autoControl);
	window.addEventListener('keydown', controlCases);
}