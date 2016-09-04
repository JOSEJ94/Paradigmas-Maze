let worker = new Worker("js/Worker.js");

class Controller {
	
	constructor() {
		
	}
	
	getGenLocal() {
		let dimM = parseInt(document.getElementById("Dimension").value);
		vista.setMessage("Generando Laberinto");
		worker.addEventListener("message", (e) => {
			modelo.setModel(JsonToMaze(e.data));
			vista.activate(false);
		});
		worker.postMessage({
			D: dimM,
			T: vista.tamC,
			E: (vista.tamC * dimM)
		});
		vista.setMessage("Generado localmente");
		vista.activate(false);
	}

	getGenServer() {
		let dimM = parseInt(document.getElementById("Dimension").value);
		vista.setMessage("Generando Laberinto");
		fetch("/generar/" + dimM, {
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
				worker.addEventListener("message", (e) => {
					modelo.setModel(JsonToMaze(e.data));
					vista.activate(false);
				});
				worker.postMessage({
					D: dimM,
					T: vista.tamC,
					E: (vista.tamC * dimM)
				});
			}); //situacion en caso de no conexion
		vista.activate(false);
	}
	
	getGen() {
		return (document.getElementById("isLocal").checked) ? this.getGenLocal() : this.getGenServer();
	}

	postSave() {
		return (document.getElementById("isLocal").checked) ? this.postSaveLocal() : this.postSaveServer();
	}

	postSaveLocal() {
		let name = document.getElementById('name').value;
		let savedgame = mazeToJson(modelo.matriz);
		this.savingLocaly(name, savedgame);
	}

	postSaveServer() { //hace peticion de guardado de una partida  del laberinto 
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
			.catch(err => {
				this.savingLocaly(name, savedgame);
			}); //caso sin conexion guarda en localstorage
	}

	getLoad() {
		return (document.getElementById("isLocal").checked) ? this.getLoadLocal() : this.getLoadServer();
	}

	getLoadServer() {
		let name = document.getElementById('name').value;
		fetch("/cargar/" + name, {
				method: "GET"
			})
			.then((response) => {
				return (response.status === 200) ? (vista.setMessage("Cargado desde Server"), response.json()) : (vista.setMessage("Partida no encontrada en el servidor"), loadingLocaly(name));
			})
			.then(obj => {
				modelo.setModel(JsonToMaze(obj));
				vista.activate(false);
			})
			.catch((err) => {
				this.loadingLocaly(name);
				vista.activate(false);
			}); //caso sin conexion carga desde localstorage
	}

	getLoadLocal() {
		let name = document.getElementById('name').value;
		this.loadingLocaly(name);
		vista.activate(false);
	}

	savingLocaly(name, savedgame) { //en caso de no haber conexion al servidor
		vista.setMessage("Intentando Guardar Localmente...");
		localStorage[name] = JSON.stringify(savedgame);
		vista.setMessage('Guardado localmente exitosamente');
	}

	loadingLocaly(name) { // en caso de no haber conexion al servidor 
		vista.setMessage("Intentando Cargar Localmente...");
		localStorage[name] ? vista.setMessage('Partida local encontrada') : vista.setMessage('No hay partida local con ese nombre');
		modelo.setModel(JsonToMaze(JSON.parse(localStorage[name])));
		(modelo.matriz) ? vista.setMessage('Cargado localmente'): vista.setMessage('No se pudo cargar localmente');
	}

	controlCases(e) {
		let next = null,
			num, boton, check;
		let controlSwitch = new mySwitch([
			() => {
				next = modelo.actual.oeste;
				num = 4;
			},
			() => {
				next = modelo.actual.norte;
				num = 1;
			},
			() => {
				next = modelo.actual.este;
				num = 2;
			},
			() => {
				next = modelo.actual.sur;
				num = 3;
			}
		]);
		boton = (e.keyCode) - 37;
		(0 <= boton && boton <= 4) ? controlSwitch.getFunction(boton)(): true; //Decorar luego!!!
		if (next && !modelo.winner) {
			check = modelo.actual.conexiones.some((e) => {
				return (e == num) ?
					(vista.mark(modelo.actual.ejeX, modelo.actual.ejeY, next.ejeX, next.ejeY, modelo.actual.tamanyo, "white"), true) :
					false;
			});
			(check) ? (
				(next.nodoFinal) ?
				(vista.activate(true), modelo.winner = true, vista.declareWinner()) :
				modelo.actual = next) :
			vista.fail.play();
		}
	}

	autoControl() {
		let n = parseInt(document.getElementById('speed').value);
		vista.deactivate();
		modelo.actual = modelo.matriz.control;
		let solucion = reverse(modelo.matriz.solucion);
		let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

		function autoMovement(next, solution) {
			let nS = myPop(solution);
			vista.mark(modelo.actual.ejeX, modelo.actual.ejeY, next.ejeX, next.ejeY, modelo.actual.tamanyo, "grey");
			modelo.actual = next;
			(next.nodoFinal) ? (vista.activate(true), vista.declareWinner()) : sleep(n).then(() => autoMovement(next.go(nS[1]), nS[0]));
		}
		let newSolution = myPop(solucion);
		modelo.winner = true;
		sleep(n).then(() => autoMovement(modelo.actual.go(newSolution[1]), newSolution[0]));
	}

	save() {
		let dt = document.getElementById("Panel").toDataURL('image/jpeg');
		this.href = dt;
	}
	
}
let controller = new Controller();

window.onload = () => {
    let leCanvas = document.getElementById("Panel");
    vista = new View(leCanvas, 50);
    vista.createListeners();
    modelo = new Model();
	vista.initialState();
    window.addEventListener('keydown', controller.controlCases);
    document.getElementById("link").addEventListener("click", controller.save, false);
}
