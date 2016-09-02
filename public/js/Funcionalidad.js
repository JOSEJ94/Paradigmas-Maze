let canvas;
let ctx;
let tamC;
let matriz;
let actual;
let trophyImage;
let tigreImage;

let msg;
let showMessage = () => document.getElementById('msg').innerHTML += new Date().toLocaleString() + ' ' + msg + '<br>';
const mostrarMensaje = new CustomEvent("showMessage", showMessage);

function setMessage(mensaje) {
    msg = mensaje;
    document.dispatchEvent(mostrarMensaje);
}

//Instrucciones por ejecutar al iniciar la página.
window.onload = () => {
    document.addEventListener("showMessage", e => showMessage());
	document.getElementById("Solucion").disabled = true;
    canvas = document.getElementById("Panel");
    ctx = canvas.getContext("2d");
    tamC = 50;
<<<<<<< HEAD
	prepareImages();
=======
	
	trophyImage = new Image();
	tigreImage = new Image();
	trophyImage.src = '../img/Trophy.png';
	tigreImage.src = '../img/Tiger.png';
>>>>>>> refs/remotes/origin/pr/4
}

function letsDoIt() {
    //Consigo los datos necesarios.
    const dim = parseInt(document.getElementById("Dimension").value);
    const esp = tamC * dim;
	
    //Edito las letiables necesarias con los valores adecuados.
    canvas.height = esp;
    canvas.width = esp;
<<<<<<< HEAD
	let toDo = new Promise(() => startMaze(dim, tamC, esp-tamC), () => errorMessage("Error al generar laberinto."));
	toDo.then(startListener()).then(activeListeners());
	
}
function errorMessage(mjs){
	alert(mjs);
	console.log(mjs);
}

function prepareImages(){//Borrar?
	trophyImage = new Image();
	tigreImage = new Image();
	trophyImage.src = '../img/Trophy.png';
	tigreImage.src = '../img/Tiger.png';
=======
	
	let toDo = new Promise(() => startMaze(dim, tamC, esp-tamC), () => setMessage("Error al generar laberinto."));
	toDo.then(startListener()).then(activeListeners());
>>>>>>> refs/remotes/origin/pr/4
}

//Método que inicializa un laberinto.
function startMaze(dim, tam_1, tam_2) {
    matriz = creaLaberinto(generaMatriz(dim, tam_1, tam_2));
	actual = matriz.control;
	actual.visitado=true;
}

function startListener() {
	const nombreEvento = "Maze2Draw";
	const dibujaLab = () => {
		function dibujaCelda(raiz, node, i, j, n) {
			drawNode(node);
			(j < n) ? dibujaCelda(raiz, node.este, i, j + 1, n): (i < n) ? dibujaCelda(raiz.sur, raiz.sur, i + 1, 1, n) : true;
		}
		dibujaCelda(matriz.control, matriz.control, 1, 1, matriz.dimension);
	};
	const evento = new CustomEvent(nombreEvento, dibujaLab);
	document.addEventListener(nombreEvento, e => dibujaLab());
    document.dispatchEvent(evento);
}

function activeListeners() {
	window.addEventListener('keydown', controlCases);
	document.getElementById("Solucion").disabled = false;
	document.getElementById("Solucion").addEventListener('click',autoControl);
}

//enviar notificacion de actualizar la vista 
function updateView(MatrizJson) {
	
<<<<<<< HEAD
	let toDo = new Promise(() =>
	{
    matriz = JsonToMaze(MatrizJson);
    matriz.control.visitado = true;
    const dim = JSON.parse(MatrizJson)[0];
    const esp = tamC * dim;
    canvas.height = esp;
    canvas.width = esp;
    actual = matriz.control;
	}
	, () => setMessage("Error al generar laberinto."));
=======
	let toDo = new Promise(() => {
		matriz = JsonToMaze(MatrizJson);
		matriz.control.visitado = true;
		const dim = JSON.parse(MatrizJson)[0];
		const esp = tamC * dim;
		canvas.height = esp;
		canvas.width = esp;
		actual = matriz.control;
	}, () => setMessage("Error al generar laberinto."));
	
>>>>>>> refs/remotes/origin/pr/4
	toDo.then(startListener()).then(activeListeners());
}

//Método que dibuja un nodo.
function drawNode(node) {
    let X=node.ejeX, Y=node.ejeY, T=node.tamanyo;
	let drawLine = (x1, y1, x2, y2) => {ctx.moveTo(x1, y1); ctx.lineTo(x2,y2);}
	let drawSwitch = new mySwitch([
		null,
		() => {drawLine(X, Y, X+T, Y);},
		() => {drawLine(X+T, Y, X+T, Y+T);},
		() => {drawLine(X, Y+T, X+T, Y+T);},
		() => {drawLine(X, Y, X, Y+T);}
	]);
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "red";
	ctx.rect(X, Y, T, T);
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.stroke();
	node.conexiones.forEach(
		(e) => {
			ctx.beginPath();
			drawSwitch.getFunction(e)();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'yellow';
			ctx.stroke();
		}
	);
	(node.visitado)?loadImage(X, Y):true;
	(node.nodoFinal)?loadTrophy(X, Y):true;
}

//Método que carga la imagen del trofeo.
function loadTrophy(x, y){
	let newX=x+(tamC*0.25), newY=y+(tamC*0.25), newT=tamC-(tamC*0.5);
	ctx.drawImage(trophyImage,newX,newY,newT,newT);
}

//Método que carga la imagen del tigre.
function loadImage(x, y){
	let newX=x+(tamC*0.25), newY=y+(tamC*0.25), newT=tamC-(tamC*0.5);
	ctx.drawImage(tigreImage,newX,newY,newT,newT);
}

//Método que marca el paso del jugador por el laberinto.
function mark(x1,y1,x2,y2,tam,co){
	let newX=x1+(tam*0.25), newY=y1+(tam*0.25), newT=tam-(tam*0.5);
	ctx.beginPath();
	ctx.rect(newX,newY,newT,newT);
	ctx.fillStyle = co;
	ctx.fill();
	ctx.stroke();
	loadImage(x2, y2);
}

//Método que desplaza al jugador por el laberinto.
function controlCases(e){
	let next = null, num, boton, check;
	let controlSwitch = new mySwitch([
		() => {next=actual.oeste; num=4;},
		() => {next=actual.norte;num=1;},
		() => {next=actual.este;num=2;},
		() => {next=actual.sur;num=3;}
	]);	
	boton = (e.keyCode)-37;
	(0<=boton && boton<=4) ? controlSwitch.getFunction(boton)() : true;//Decorar luego!!!
	if(next){
		check = actual.conexiones.some((e) => {
			if(e==num){
				mark(actual.ejeX, actual.ejeY, next.ejeX, next.ejeY, actual.tamanyo, "white");
				return true;
			}
			else
				return false;
		});
		
		if(check){
			(next.nodoFinal) ? declareWinner() : actual=next;
		}
		else{
			alert("No hay camino.");
		}
	}
}

//Método que resuelve al laberinto.
function autoControl(){
	actual = matriz.control;
	let solucion = reverse(matriz.solucion);
	
	let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
	
	function autoMovement(next, solution){
		let nS = myPop(solution);
		mark(actual.ejeX, actual.ejeY, next.ejeX, next.ejeY, actual.tamanyo, "grey");
		actual = next;
		(next.nodoFinal) ? declareWinner() : sleep(500).then(() => autoMovement(next.go(nS[1]), nS[0]));
	}
	let newSolution = myPop(solucion);
	window.removeEventListener('keydown',controlCases);
	sleep(500).then(() => autoMovement(actual.go(newSolution[1]), newSolution[0]));
}

//Método que remueve el listener al terminar la partida.
function declareWinner(){
	window.removeEventListener('keydown',controlCases);
	alert("Ganaste!!!")
}