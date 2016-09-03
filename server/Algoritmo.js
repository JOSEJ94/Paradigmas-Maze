let entidades = require('./Entidades.js');
let utils = require('./utilidades.js');

//==================================================
//===============Método genera matriz===============
//==================================================
//Retorna el nodo superior izquierdo de una matriz completada.
function generaMatriz(dim,tam,esp){
	let primero = new entidades.Nodo(tam, esp, esp);
	
	//Crea las filas.
	function buildRow(raiz,newO,newS,x,y){
		let node = new entidades.Nodo(tam, x+tam, y);
		node.oeste=newO;
		newO.este=node;
		node.sur=newS;
		newS.norte=node;
		return ((x+tam*2) < (dim*tam)) ? buildStructure(raiz,node,newS.este,x+tam,y) :
							   (0 < y) ? buildStructure(raiz,null,raiz.este,x+tam,y) : raiz;
	}
	
	//Inicia las columnas (Base de las filas).
	function buildColumn(raiz,newS,x,y){
		let aux = new entidades.Nodo(tam,0,y-tam);
		let node = new entidades.Nodo(tam,tam,y-tam);
		raiz.norte=aux;
		aux.sur=raiz;
		node.oeste=aux;
		aux.este=node;
		node.sur=newS;
		newS.norte=node;
		return (0 < (y-tam) || 0 < x) ? buildStructure(aux,node,newS.este,tam,y-tam) : aux;
	}
	
	//Crea la primera fila (Base de todo).
	function firstRow(raiz,x,y){
		let node = new entidades.Nodo(tam, x-tam, y);
		node.este=raiz;
		raiz.oeste=node;
		return (0 < x-tam) ? buildStructure(node,null,null,x-tam,y) : buildStructure(node,null,node.este,x-tam,y);
	}
	
	//Método que crea la estructura de la matriz.
	function buildStructure(raiz,newO,newS,x,y){
		return (newO) ? buildRow(raiz,newO,newS,x,y) :
			(newS) ? buildColumn(raiz,newS,x,y) : firstRow(raiz,x,y);
	}

	return new entidades.Matriz(
		dim,										//Dimensión de la matriz.
		buildStructure(primero,null,null,esp,esp),  //Primer nodo de la matriz ya formada.
		null										//Null porque aún no hay un laberinto adentro, no hay solución.
	);
}

//==================================================
//=============Método genera laberinto.=============
//==================================================
//Retorna el nodo inicial del laberinto.
function creaLaberinto(tabla){
	let solucion;
	
	//Define el camino más largo entre dos nodos para complicar el laberinto.
	let nuevoMayor = (nN, nM) => {solucion=utils.copyArray(nM); return [nN, nM.length];};
	
	//Define la inversa del último movimiento para poder hacer backtracking entre otras cosas.
	let opuesto = n => (n<3) ? (n+2) : (n-2);
	
	//Genera un número random entre min y max.
	let getRandom = (min, max) => Math.floor((Math.random() * max) + min);
	
	//Define cuál será el nodo equivalente al final del laberinto.
	let getEnd = (oN, nN, oM, nM) => (!oN || oM < nM.length) ? nuevoMayor(nN, nM) : [oN, oM];

	//Hace backtracking cuando no se tiene otro camino.
	function deadEnd(node,pila,nodeF,numM){
		let finalNode = getEnd(nodeF, node, numM, pila);
		let newNodoF = finalNode[0];
		let newPila = utils.myPop(pila);
		(nodeF)?nodeF.nodoFinal=false:true;
		newNodoF.nodoFinal=true;
		return (pila.length==0)?node:findPath(node.go(opuesto(newPila[1])), newPila[0], newNodoF, finalNode[1]);
	}
	
	//Avanza en el grafo cuando hay por dónde ir.
	function alleyClear(opc,node,pila,nodeF,numM){
		let num=getRandom(0,opc.length);
		node.connect(opc[num]);
		node.go(opc[num]).connect(opuesto(opc[num]));
		return findPath(node.go(opc[num]), utils.myPush(pila, opc[num]), nodeF, numM);
	}
	
	//Define un camino según las opciones que posee el nodo, sea camino libre o sin salida.
	function findPath(node,pila,nodeF,numM){
		node.visitado=false;
		let opc = node.where();
		return (opc.length==0)?deadEnd(node,pila,nodeF,numM):alleyClear(opc,node,pila,nodeF,numM);
	}
	
	return new entidades.Matriz(
		tabla.dimension,					//Dimensión de la matriz que contiene al laberinto.
		findPath(tabla.control,[],null,0),  //Nodo por el cual comienza el laberinto.
		solucion							//Camino que lleva directamente al final del laberinto.
	);
}

module.exports = {
	generaMatriz : generaMatriz,
	creaLaberinto : creaLaberinto
}