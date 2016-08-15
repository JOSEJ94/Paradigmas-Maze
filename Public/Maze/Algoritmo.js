//==================================================
//Método genera matriz.
//==================================================
function generaMatriz(dim){
	function CC(raiz, newO, newS, node, i, j, n){//Caso continuo (Genera las filas).
		node.oeste=newO; newO.este=node; node.sur=newS; newS.norte=node;
		return (j+1<n)?creaColumnas(raiz, node, newS.este, i, j+1, n):(i+1<n)?creaColumnas(raiz, null, raiz.este, i+1, 0, n):raiz;
	}
	function CL(raiz, newS, node, aux, i, j, n){//Caso lateral (Inicia las columnas que son la base de las filas).
		raiz.norte=aux; aux.sur=raiz; node.oeste=aux; aux.este=node; node.sur=newS; newS.norte=node;
		return (j+2<n)?creaColumnas(aux, node, newS.este, i, j+2, n):(i+1<n)?creaColumnas(aux, null, aux.este, i+1, 0, n):aux;
	}
	function CI(raiz, node, i, j, n){//Caso inicial (Crea la primera fila que es la base de todo).
		node.este=raiz; raiz.oeste=node;
		return (j+1<n)?creaColumnas(node, null, null, i, j+1, n):(i+1<n)?creaColumnas(node, null, node.este, i+1, 0, n):node;
	}
	function creaColumnas(raiz, newO, newS, i, j, n){
		return (newO)?CC(raiz,newO,newS,new Nodo(false),i,j,n):(newS)?CL(raiz,newS,new Nodo(false),new Nodo(false),i,j,n):CI(raiz,new Nodo(false),i,j,n);
	}
	return creaColumnas(new Nodo(false), null, null, 0, 1, dim);
}

//==================================================
//Método genera laberinto.
//==================================================
function creaLaberinto(tabla){//Falta bloquear caminos.
	tabla.control.posicionado=true;
	function getRandom(min, max){
		return Math.floor((Math.random() * max) + min);
	}
	function opuesto(n){
		return (n<3)?(n+2):(n-2);
	}
	function getInicio(dim){//Debe darme el nodo del cual partir.
	}
	function callejonSinSalida(node, pilaCamino){
		return (pilaCamino.length==0)?node:encuentraCamino(node.go(opuesto(pilaCamino.pop())), pilaCamino);
	}
	function callejonDespejado(opc, node, pilaCamino){
		var num=getRandom(0,opc.length); pilaCamino.push(opc[num]);
		
		console.log(opc[num]);
		
		return encuentraCamino(node.go(opc[num]), pilaCamino);
	}
	function encuentraCamino(node, pilaCamino){
		node.visitado=true;
		var opc = node.where();
		return (opc.length==0)?callejonSinSalida(node,pilaCamino):callejonDespejado(opc,node,pilaCamino);
	}
	return encuentraCamino(tabla.control,[]);
}