//conexiones ajax medio controller..
function getGen() {
	let dims = document.getElementById("Dimension").value;
    fetch("/generar/"+dims, {
            method: "GET"
        }) //hace peticion por ajax, pide generar laberinto al server
        .then((response) => {
           return (response.status === 200) ? response.json() : "Not 200";
        }) //revisa la respuesta del servidor para ver si es correcta
        .then(obj => {
			updateView(obj);		
        }) //asigna el div asociado con el resultado de la solicitud (para debugging)
        .catch(function error(err) {
            document.getElementById("msg").innerHTML = 'Connection Lost';
            letsDoIt();
        });//situacion en caso de no conexion
}

function postSave() { //hace peticion de guardado de una partida  del laberinto 
    let name = document.getElementById('name').value; //obtiene nombre de la partida
    fetch("/guardar/" + name, {
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			},
            method: "POST",
			body: mazeToJson(matriz)
        }) //inicia solicitud de guardado
        .then((response) => {
            return (response.status === 200) ? response.text() : "error";
        }) //analiza respuesta del servidor
        .then(obj => {
            document.getElementById("msg").innerHTML = obj;
        }) //muestra el resultado en el browser
        .catch(function error(err) {
			savingLocaly(name);
        }); //caso sin conexion guarda en localstorage
}

function getLoad() {
    let name = document.getElementById('name').value;
    fetch("/cargar/" + name, {
            method: "GET"
        })
        .then((response) => {
             return (response.status === 200) ? response.json() : "Not 200";
        })
        .then(obj => {
            document.getElementById("msg").innerHTML ='Cargado desde Server '/*obj*/;
			updateView(obj);		
        })
        .catch((err)=> {
			loadingLocaly(name);
        }); //caso sin conexion carga desde localstorage

	loadingLocaly(name);
}

function savingLocaly(name){ //en caso de no haber conexion al servidor
	document.getElementById("msg").innerHTML = 'No hay conexion con el servidor...';
	localStorage[name] = matriz;
	(localStorage[name])?alert('Partida Guardada Localmente'):alert('Ha ocurrido un problema al guardar localmente');
}

function loadingLocaly(name){ // en caso de no haber conexion al servidor
	document.getElementById("msg").innerHTML = 'No hay conexion con el servidor...';
	matriz = localStorage[name];
	(matriz)?alert('Partida Local cargada'):alert('Partida Local no encontrada/no existente');
}