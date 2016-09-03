class Model{
	constructor(){
	this.matriz = undefined;
	this.actual= undefined;
	this.winner=true;
	}

	startMaze(dim, tam_1, tam_2) {
		this.matriz = creaLaberinto(generaMatriz(dim, tam_1, tam_2));
		this.actual = this.matriz.control;
		this.actual.visitado=true;
		this.winner=false;
		document.dispatchEvent(evento);
	}
	
	setModel(newMatriz){
		this.matriz = newMatriz;
		this.actual = this.matriz.control;
		this.actual.visitado=true;
		this.winner=false;
		document.dispatchEvent(evento);
	}
}
let modelo;

/*
//Instrucciones por ejecutar al iniciar la página.
window.onload = () => {
    document.addEventListener("showMessage", e => showMessage());
	document.getElementById("Solucion").disabled = true;
    canvas = document.getElementById("Panel");
    ctx = canvas.getContext("2d");
    tamC = 50;
	prepareImages();
}

//enviar notificacion de actualizar la vista 
function updateView(MatrizJson) {
	
	let toDo = new Promise(() => {
		matriz = JsonToMaze(MatrizJson);
		matriz.control.visitado = true;
		const dim = JSON.parse(MatrizJson)[0];
		const esp = tamC * dim;
		canvas.height = esp;
		canvas.width = esp;
		actual = matriz.control;
	}, () => setMessage("Error al generar laberinto."));
	toDo.then(startListener()).then(activeListeners());
}
*/