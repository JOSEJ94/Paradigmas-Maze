var canvas;
var ctx;
var tamanoCelda;

var matriz;
var actual;

	//Preparo los listeners.
	const nombreEvento = "Maze2Draw";	
	const dibujaLab = function(){
		function dibujaCelda(raiz, node, i, j, n){
			drawNode(node);
			(j<n)?dibujaCelda(raiz, node.este, i, j+1, n):(i<n)?dibujaCelda(raiz.sur, raiz.sur, i+1, 1, n):null;
		}
		dibujaCelda(matriz.control, matriz.control, 1, 1, matriz.dimension);
	};
	const evento = new CustomEvent(nombreEvento, dibujaLab);
	document.addEventListener(nombreEvento, e=>dibujaLab());

window.onload = function(){
	canvas = document.getElementById("Panel");
	ctx = canvas.getContext("2d");
	tamanoCelda = 50;
}

function letsDoIt(){
	//Consigo los datos necesarios.
	const dim = parseInt(document.getElementById("Dimension").value);
	const esp = tamanoCelda*dim;	
	//Edito las variables necesarias con los valores adecuados.
	canvas.height=esp; canvas.width=esp;
	matriz=start(dim, tamanoCelda, esp-tamanoCelda);
	actual=matriz.control;
	//Activa el listener que dibuja el laberinto y los listeners de control.
	document.dispatchEvent(evento);
	window.addEventListener('keydown',controlCases);
}

function updateView(MatrizJson)
{  
	matriz = JsonToMaze(MatrizJson);
	const dim = JSON.parse(MatrizJson)[0];
	const esp = tamanoCelda*dim;
	canvas.height=esp; canvas.width=esp;
	actual=matriz.control;
	document.dispatchEvent(evento);
	window.addEventListener('keydown',controlCases);
}

function start(dim, tam_1, tam_2){
	matriz = new Matriz(dim);
	matriz.control = generaMatriz(dim, tam_1, tam_2);
	matriz.control = creaLaberinto(matriz);	
	return matriz;
}

function drawNode(node){//Derecha, abajo, largo, alto, grosor y color.
	/*ctx.beginPath();
		ctx.lineWidth = gr;
		ctx.strokeStyle = "red";
		ctx.rect(this.ejeX, this.ejeY, this.tamanyo, this.tamanyo);
		ctx.fillStyle = co;
		ctx.fill();
		ctx.stroke();*/
	
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
}

function loadImage(x, y){
	var newX=x+(tamanoCelda*0.25), newY=y+(tamanoCelda*0.25), newT=tamanoCelda-(tamanoCelda*0.5);
	var base_image = new Image();
	base_image.src = './img/Ej.jpg';
	ctx.drawImage(base_image,newX,newY,newT,newT);
}

function mark(x,y,tam,co){
	var newX=x+(tam*0.25), newY=y+(tam*0.25), newT=tam-(tam*0.5);
	ctx.beginPath();
	ctx.rect(newX,newY,newT,newT);
	ctx.fillStyle = co;
	ctx.fill();
	ctx.stroke();
}

function controlCases(e){
	var next, num, aux, color;
	switch (e.keyCode) {
		case 37:
			//alert("Izquierda");
			next=actual.oeste;
			num=4;
			break;
		case 38:
			//alert("Arriba");
			next=actual.norte;
			num=1;
			break;
		case 39:
			//alert("Derecha");
			next=actual.este;
			num=2;
			break;
		case 40:
			//alert("Abajo");
			next=actual.sur;
			num=3;
			break;
	}
	for(var i=0; i<actual.conexiones.length; i++){//Un for por eliminar!!!
		if(actual.conexiones[i]==num){
			mark(actual.ejeX, actual.ejeY, actual.tamanyo, "white");//Por qué no sale como debería?
			loadImage(next.ejeX, next.ejeY);
			next.reConnect(num);//Optimizar que no se inserte si ya está el número dentro.
			actual=next;
			break;
		}
	}
}