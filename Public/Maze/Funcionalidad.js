var canvas;
var ctx;
var tamanoCelda;
var matriz;
var actual;

	const nombreEvento = "Maze2Draw";	
	const dibujaLab = function(){
		function dibujaCelda(raiz, node, i, j, n){
			drawNode(node);
			(j<n)?dibujaCelda(raiz, node.este, i, j+1, n):(i<n)?dibujaCelda(raiz.sur, raiz.sur, i+1, 1, n):true;
		}
		dibujaCelda(matriz.control, matriz.control, 1, 1, matriz.dimension);
	};
	const evento = new CustomEvent(nombreEvento, dibujaLab);
	

//Instrucciones por ejecutar al iniciar la página.
window.onload = function(){
	canvas = document.getElementById("Panel");
	ctx = canvas.getContext("2d");
	tamanoCelda = 50;
}

//Método que inicializa una partida.
function letsDoIt(){
	//Consigo los datos necesarios.
	const dim = parseInt(document.getElementById("Dimension").value);
	const esp = tamanoCelda*dim;
	
	//Edito las variables necesarias con los valores adecuados.
	canvas.height=esp; canvas.width=esp;
	matriz=start(dim, tamanoCelda, esp-tamanoCelda);
	
	matriz.control.visitado=true;
	actual=matriz.control;
	
	//Preparo los listeners.
	document.addEventListener(nombreEvento, e=>dibujaLab());
	
	//Activa el listener que dibuja el laberinto y los listeners de control.
	document.dispatchEvent(evento);
	window.addEventListener('keydown',controlCases);
}

//Método que inicializa un laberinto.
function start(dim, tam_1, tam_2){
	matriz = new Matriz(dim);
	matriz.control = generaMatriz(dim, tam_1, tam_2);
	matriz.control = creaLaberinto(matriz);	
	return matriz;
}

//enviar notificacion de actualizar la vista 
function updateView(MatrizJson) {  
	matriz = JsonToMaze(MatrizJson);
	matriz.control.visitado= true;
	const dim = JSON.parse(MatrizJson)[0];
	const esp = tamanoCelda*dim;
	canvas.height=esp; canvas.width=esp;
	actual=matriz.control;
	document.addEventListener(nombreEvento, e=>dibujaLab());
	document.dispatchEvent(evento);
	window.addEventListener('keydown',controlCases);
}

//Método que dibuja un nodo.
function drawNode(node){
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "red";
	ctx.rect(node.ejeX, node.ejeY, node.tamanyo, node.tamanyo);
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.stroke();
	
	for(var i=0; i<node.conexiones.length; i++){
		ctx.beginPath();
		switch(node.conexiones[i]){
			case 1:			
				ctx.moveTo(node.ejeX,node.ejeY);
				ctx.lineTo(node.ejeX+node.tamanyo,node.ejeY);
				break;
			case 2:
				ctx.moveTo(node.ejeX+node.tamanyo,node.ejeY);
				ctx.lineTo(node.ejeX+node.tamanyo,node.ejeY+node.tamanyo);
				break;
			case 3:
				ctx.moveTo(node.ejeX,node.ejeY+node.tamanyo);
				ctx.lineTo(node.ejeX+node.tamanyo,node.ejeY+node.tamanyo);
				break;
			case 4:
				ctx.moveTo(node.ejeX,node.ejeY);
				ctx.lineTo(node.ejeX,node.ejeY+node.tamanyo);
				break;
		}
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'yellow';
		ctx.stroke();
	}
	(node.visitado)?loadImage(node.ejeX, node.ejeY):true;
	(node.nodoFinal)?loadTrophy(node.ejeX, node.ejeY):true;
}

//Método que carga la imagen del trofeo.
function loadTrophy(x, y){
	var newX=x+(tamanoCelda*0.25), newY=y+(tamanoCelda*0.25), newT=tamanoCelda-(tamanoCelda*0.5);
	var base_image = new Image();
	base_image.src = '../img/Trofeo.png';
	ctx.drawImage(base_image,newX,newY,newT,newT);
}

//Método que carga la imagen del tigre.
function loadImage(x, y){
	var newX=x+(tamanoCelda*0.25), newY=y+(tamanoCelda*0.25), newT=tamanoCelda-(tamanoCelda*0.5);
	var base_image = new Image();
	base_image.src = '../img/Ej.jpg';
	ctx.drawImage(base_image,newX,newY,newT,newT);
}

//Método que marca el paso del jugador por el laberinto.
function mark(x,y,tam,co){
	var newX=x+(tam*0.25), newY=y+(tam*0.25), newT=tam-(tam*0.5);
	ctx.beginPath();
	ctx.rect(newX,newY,newT,newT);
	ctx.fillStyle = co;
	ctx.fill();
	ctx.stroke();
}

//Método que desplaza al jugador por el laberinto.
function controlCases(e){
	var next, num, aux, color;
	switch (e.keyCode) {
		case 37:
			next=actual.oeste;
			num=4;
			break;
		case 38:
			next=actual.norte;
			num=1;
			break;
		case 39:
			next=actual.este;
			num=2;
			break;
		case 40:
			next=actual.sur;
			num=3;
			break;
	}
	for(var i=0; i<actual.conexiones.length; i++){//Un for por eliminar!!!
		if(actual.conexiones[i]==num){
			mark(actual.ejeX, actual.ejeY, actual.tamanyo, "white");//Por qué no sale como debería?
			loadImage(next.ejeX, next.ejeY);
			(next.nodoFinal) ? alert("Ganaste!!!") : actual=next;
			break;
		}
	}
}