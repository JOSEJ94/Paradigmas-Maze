var tamanoCelda = 40;
var espacio;

function inicio(){
	var dim = parseInt(document.getElementById("Dimension").value);
	espacio = tamanoCelda*dim;
	var matriz = new Matriz(dim);
	
	//Llamo al <canvas> y dibujo el espacio de trabajo.
	var canvas = document.getElementById("Panel");
	canvas.height=espacio; canvas.width=espacio;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle="yellow";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle="red";
	ctx.lineWidth=10;
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	
	//Masacre.
	matriz.control = generaMatriz(ctx, dim, tamanoCelda, espacio-tamanoCelda);
	/*function eraseLine(ctx,x,y,tam,tipo){
		ctx.beginPath();
		switch(tipo){
			case 1:			
				ctx.moveTo(x, y);
				ctx.lineTo(x+tam, y);
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'red';
				ctx.stroke();
				break;
			case 2:
				ctx.moveTo(x+tam, y);
				ctx.lineTo(x+tam, y+tam);
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'red';
				ctx.stroke();
				break;
			case 3:
				ctx.moveTo(x, y+tam);
				ctx.lineTo(x+tam, y+tam);
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'red';
				ctx.stroke();
				break;
			case 4:
				ctx.moveTo(x, y);
				ctx.lineTo(x, y+tam);
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'red';
				ctx.stroke();
				break;
		}
	}
	eraseLine(ctx,matriz.control.sur.ejeX,matriz.control.sur.ejeY,tamanoCelda,1);
	eraseLine(ctx,matriz.control.sur.ejeX,matriz.control.sur.ejeY,tamanoCelda,2);
	eraseLine(ctx,matriz.control.sur.ejeX,matriz.control.sur.ejeY,tamanoCelda,3);
	eraseLine(ctx,matriz.control.sur.ejeX,matriz.control.sur.ejeY,tamanoCelda,4);*/
	var inicio = creaLaberinto(matriz, ctx);
}