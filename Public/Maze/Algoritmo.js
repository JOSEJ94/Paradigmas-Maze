//==================================================
//Método genera matriz.
//==================================================
function generaMatriz(ctx,dim,tam,esp){//Falta quitarle los estados -= y +=
	var grosor = "1"; var color = "yellow";
	var x = esp; var y = esp; var primero = new Nodo(tam, x, y);
	
	function CC(raiz, newO, newS, i, j, n){//Caso continuo (Genera las filas).
		x+=tam; var node = new Nodo(tam, x, y); node.draw(ctx, grosor, color);
		node.oeste=newO; newO.este=node; node.sur=newS; newS.norte=node;
		return (j+1<n)?
			creaColumnas(raiz, node, newS.este, i, j+1, n):
				(i+1<n)?
					creaColumnas(raiz, null, raiz.este, i+1, 0, n):
						raiz;
	}
	function CL(raiz, newS, i, j, n){//Caso lateral (Inicia las columnas que son la base de las filas).
		y=y-tam; x= 0; var aux = new Nodo(tam,x,y); x+=tam; var node = new Nodo(tam,x,y);
		aux.draw(ctx, grosor, color); node.draw(ctx, grosor, color);
		raiz.norte=aux; aux.sur=raiz; node.oeste=aux; aux.este=node; node.sur=newS; newS.norte=node;
		return (j+2<n)?
			creaColumnas(aux, node, newS.este, i, j+2, n):
				(i+1<n)?
					creaColumnas(aux, null, aux.este, i+1, 0, n):
						aux;
	}
	function CI(raiz,i,j,n){//Caso inicial (Crea la primera fila que es la base de todo).
		x-=tam; var node = new Nodo(tam, x, y); node.draw(ctx, grosor, color);
		node.este=raiz; raiz.oeste=node;
		return (j+1<n)?
			creaColumnas(node, null, null, i, j+1, n):
				(i+1<n)?
					creaColumnas(node, null, node.este, i+1, 0, n):
						node;
	}
	function creaColumnas(raiz, newO, newS, i, j, n){
		return (newO)?
			CC(raiz,newO,newS,i,j,n):
				(newS)?
					CL(raiz,newS,i,j,n):
						CI(raiz,i,j,n);
	}
	primero.draw(ctx, grosor, color);
	return creaColumnas(primero, null, null, 0, 1, dim);
}

//==================================================
//Método genera laberinto.
//==================================================
function creaLaberinto(tabla, ctx){//Falta bloquear caminos.
	var grosor = "1"; var color = "red";
	function getRandom(min, max){
		return Math.floor((Math.random() * max) + min);
	}
	function opuesto(n){
		return (n<3)?(n+2):(n-2);
	}
	function getInicio(dim){//Debe darme el nodo del cual partir.
	}
	function callejonSinSalida(node, pilaCamino){
		return (pilaCamino.length==0)?
			node:
				encuentraCamino(node.go(opuesto(pilaCamino.pop())), pilaCamino);
	}
	function callejonDespejado(opc, node, pilaCamino){
		var num=getRandom(0,opc.length); pilaCamino.push(opc[num]);
		node.conect(ctx,opc[num]);
		return encuentraCamino(node.go(opc[num]), pilaCamino);
	}
	function encuentraCamino(node, pilaCamino){
		node.visitado=false;
		var opc = node.where();
		return (opc.length==0)?
			callejonSinSalida(node,pilaCamino):
				callejonDespejado(opc,node,pilaCamino);
	}
	return encuentraCamino(tabla.control,[]);
}