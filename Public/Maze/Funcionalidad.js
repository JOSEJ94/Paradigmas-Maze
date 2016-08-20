var tamanoCelda = 50;
var espacio;

function inicio(){
	var dim = parseInt(document.getElementById("Dimension").value);
	espacio = tamanoCelda*dim;
	matriz = new Matriz(dim);
	var canvas = document.getElementById("Panel");
	canvas.height=espacio; canvas.width=espacio;
	var ctx = canvas.getContext("2d");
	matriz.control = generaMatriz(ctx, dim, tamanoCelda, espacio-tamanoCelda);
	matriz.control = creaLaberinto(matriz, ctx);
	var node=matriz.control;
	
	function startImage(){
		base_image = new Image();
		base_image.src = './img/Ej.jpg';
		base_image.onload = function(){
			ctx.drawImage(base_image, 0, 0,tamanoCelda-5,tamanoCelda-5);
		}
	}
	function loadImage(x, y){
		var base_image = new Image();
		base_image.src = './img/Ej.jpg';
		ctx.drawImage(base_image, x, y,tamanoCelda-5,tamanoCelda-5);
	}
	function controlCases(e){
		switch (e.keyCode) {
			case 37:
				//alert("Izquierda");
				for(var i=0; i<node.conexiones.length; i++){
					if(node.conexiones[i]==4){
						loadImage(node.oeste.ejeX+2, node.oeste.ejeY+2);
						node.draw(ctx, "0", "white");
						node.oeste.conect(ctx, 2);
						node=node.oeste;
						break;
					}
				}
				break;
			case 38:
				//alert("Arriba");
				for(var i=0; i<node.conexiones.length; i++){
					if(node.conexiones[i]==1){
						loadImage(node.norte.ejeX+2, node.norte.ejeY+2);
						node.draw(ctx, "0", "white");
						node.norte.conect(ctx, 3);
						node=node.norte;
						break;
					}
				}
				break;
			case 39:
				//alert("Derecha");
				for(var i=0; i<node.conexiones.length; i++){
					if(node.conexiones[i]==2){
						loadImage(node.este.ejeX+2, node.este.ejeY+2);
						node.draw(ctx, "0", "white");
						node.este.conect(ctx, 4);
						node=node.este;
						break;
					}
				}
				break;
			case 40:
				//alert("Abajo");
				for(var i=0; i<node.conexiones.length; i++){
					if(node.conexiones[i]==3){
						loadImage(node.sur.ejeX+2, node.sur.ejeY+2);
						node.draw(ctx, "0", "white");
						node.sur.conect(ctx, 1);
						node=node.sur;
						break;
					}
				}
				break;
		}
	}
	startImage();
	window.addEventListener('keydown',controlCases);
}