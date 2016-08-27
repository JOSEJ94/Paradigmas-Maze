let entidades = require('./Entidades');

//==================================================
//===============Método genera matriz===============
//==================================================
//Retorna el nodo superior izquierdo de la matriz.
function generaMatriz(dim,tam,esp){
	var primero = new entidades.Nodo(tam, esp, esp);
	
	//Crea las filas.
	function buildRow(raiz, newO, newS, i, j, n,x,y){
		var node = new entidades.Nodo(tam, x+tam, y);
		node.oeste=newO;
		newO.este=node;
		node.sur=newS;
		newS.norte=node;
		return (j+1<n) ? buildStructure(raiz,node,newS.este,i,j+1,n,x+tam,y) :
			(i+1<n) ? buildStructure(raiz,null,raiz.este,i+1,0,n,x+tam,y) : raiz;
	}
	
	//Inicia las columnas (Base de las filas).
	function buildColumn(raiz,newS,i,j,n,x,y){
		var aux = new entidades.Nodo(tam,0,y-tam);
		var node = new entidades.Nodo(tam,tam,y-tam);
		raiz.norte=aux;
		aux.sur=raiz;
		node.oeste=aux;
		aux.este=node;
		node.sur=newS;
		newS.norte=node;
		return (j+2<n) ? buildStructure (aux, node, newS.este, i, j+2, n,tam,y-tam) :
			(i+1<n) ? buildStructure(aux, null, aux.este, i+1, 0, n,tam,y-tam) : aux;
	}
	
	//Crea la primera fila (Base de todo).
	function firstRow(raiz,i,j,n,x,y){//Crea la primera fila que es la base de todo.
		var node = new entidades.Nodo(tam, x-tam, y);
		node.este=raiz;
		raiz.oeste=node;
		return (j+1<n) ? buildStructure(node, null, null, i, j+1, n,x-tam,y) :
			(i+1<n) ? buildStructure(node, null, node.este, i+1, 0, n,x-tam,y) : node;
	}
	//Método que define qué sigue.
	function buildStructure(raiz,newO,newS,i,j,n,x,y){
		return (newO) ? buildRow(raiz, newO, newS, i, j, n, x, y) :
			(newS) ? buildColumn(raiz, newS, i, j, n, x, y) : firstRow(raiz, i, j, n, x, y);
	}
	return buildStructure(primero,null,null,0,1,dim,esp,esp);
}

//==================================================
//=============Método genera laberinto.=============
//==================================================
//Retorna el nodo inicial del laberinto.
function creaLaberinto(tabla){
	let getRandom = (min, max) => Math.floor((Math.random() * max) + min);
	let opuesto = n => (n<3) ? (n+2) : (n-2);
	let getEnd = (oldN, newN, oldMax, newMax) => (!oldN) ? [newN, newMax] : (oldMax < newMax) ? [newN, newMax] : [oldN, oldMax];

	function deadEnd(node,pila,nodeF,numM){//Hace backtracking.
		var finalNode = getEnd(nodeF, node, numM, pila.length);
		var newNodoF = finalNode[0];
		var newNumMax = finalNode[1];
		(nodeF)?nodeF.nodoFinal=false:true;
		newNodoF.nodoFinal=true;
		return (pila.length==0)?node:findPath(node.go(opuesto(pila.pop())), pila, newNodoF, newNumMax);
	}
	function alleyClear(opc,node,pila,nodeF,numM){//Callejón despejado -> Avanza en el grafo.
		var num=getRandom(0,opc.length);
		pila.push(opc[num]);
		node.connect(opc[num]);
		node.go(opc[num]).connect(opuesto(opc[num]));
		return findPath(node.go(opc[num]), pila, nodeF, numM);
	}
	function findPath(node,pila,nodeF,numM){//Define un camino según las opciones que posee el nodo.
		node.visitado=false;
		var opc = node.where();
		return (opc.length==0)?deadEnd(node,pila,nodeF,numM):alleyClear(opc,node,pila,nodeF,numM);
	}
	return findPath(tabla.control,[],null,0);
}

module.exports = {
	creaLaberinto : creaLaberinto,
	generaMatriz : generaMatriz
}