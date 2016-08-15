var dimensionReal = 100;

function inicio(){
	var dim = document.getElementById("Dimension").value;
	var matriz = new Matriz(parseInt(dim));
	matriz.control = generaMatriz(parseInt(dim));
	var inicio=creaLaberinto(matriz);
	return inicio.estado;
}

function dibujarLineas(c,x1,y1,x2,y2){
	c.moveTo(x1,y2);
	c.lineTo(x2,y2);
	return c;
}

function draw(){
	var canvas = document.getElementById("Panel");
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle="yellow";
	ctx.fillRect(0,0,canvas.width,canvas.height);
		
	ctx.strokeStyle="red";
	ctx.lineWidth=10;
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	
	ctx.beginPath();
	ctx.lineWidth = "10";
	ctx.strokeStyle = "red";
	ctx.rect(5, 5, 290, 140);
	ctx.stroke();

	// Green rectangle
	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = "green";
	ctx.rect(30, 30, 50, 50);
	ctx.stroke();

	// Blue rectangle
	ctx.beginPath();
	ctx.lineWidth = "10";
	ctx.strokeStyle = "blue";
	ctx.rect(50, 50, 150, 80);
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.stroke();
}









