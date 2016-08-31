let entidades = require('./Entidades');

let myPush = (a, n) => a.concat(n);
let copyArray = (a) => a.slice(0, a.length);
let reverse = (a) => a.map((c, i) => a[a.length - (i + 1)]);
let myPop = (a) => new Array(a.slice(0, a.length-1), a[a.length-1]);

//==================================================
//===============Método genera matriz===============
//==================================================
//Retorna el nodo superior izquierdo de la matriz.
function generaMatriz(dim,tam,esp){
	var primero = new entidades.Nodo(tam, esp, esp);
	
	//Crea las filas.
	function buildRow(raiz,newO,newS,x,y){
		var node = new entidades.Nodo(tam, x+tam, y);
		node.oeste=newO;
		newO.este=node;
		node.sur=newS;
		newS.norte=node;
		return ((x+(tam*2))<(dim*tam)) ? buildStructure(raiz,node,newS.este,x+tam,y) :
			(0 < y) ? buildStructure(raiz,null,raiz.este,x+tam,y) : raiz;
	}
	
	//Inicia las columnas (Base de las filas).
	function buildColumn(raiz,newS,x,y){
		var aux = new entidades.Nodo(tam,0,y-tam);
		var node = new entidades.Nodo(tam,tam,y-tam);
		raiz.norte=aux;
		aux.sur=raiz;
		node.oeste=aux;
		aux.este=node;
		node.sur=newS;
		newS.norte=node;
		return (0 < (y-tam) || 0 < x) ? buildStructure (aux,node,newS.este,tam,y-tam) : aux;
	}
	
	//Crea la primera fila (Base de todo).
	function firstRow(raiz,x,y){//Crea la primera fila que es la base de todo.
		var node = new entidades.Nodo(tam, x-tam, y);
		node.este=raiz;
		raiz.oeste=node;
		return (0 < x-tam) ? buildStructure(node,null,null,x-tam,y) : buildStructure(node,null,node.este,x-tam,y);
	}
	
	//Método que define qué sigue.+
	function buildStructure(raiz,newO,newS,x,y){
		return (newO) ? buildRow(raiz,newO,newS,x,y) :
			(newS) ? buildColumn(raiz,newS,x,y) : firstRow(raiz,x,y);
	}

	return new entidades.Matriz(dim, buildStructure(primero,null,null,esp,esp), null);
}

//==================================================
//=============Método genera laberinto.=============
//==================================================
//Retorna el nodo inicial del laberinto.
function creaLaberinto(tabla){
	let solucion;
	let nuevoMayor = (nN, nM) => {solucion=copyArray(nM); return [nN, nM.length];};
	let opuesto = n => (n<3) ? (n+2) : (n-2);
	let getRandom = (min, max) => Math.floor((Math.random() * max) + min);
	let getEnd = (oN, nN, oM, nM) => (!oN) ? nuevoMayor(nN, nM) : (oM < nM.length) ? nuevoMayor(nN, nM) : [oN, oM];

	function deadEnd(node,pila,nodeF,numM){//Hace backtracking.
		var finalNode = getEnd(nodeF, node, numM, pila);
		var newNodoF = finalNode[0];
		var newPila = myPop(pila);
		(nodeF)?nodeF.nodoFinal=false:true;
		newNodoF.nodoFinal=true;
		return (pila.length==0)?node:findPath(node.go(opuesto(newPila[1])), newPila[0], newNodoF, finalNode[1]);
	}
	
	function alleyClear(opc,node,pila,nodeF,numM){//Callejón despejado -> Avanza en el grafo.
		var num=getRandom(0,opc.length);
		node.connect(opc[num]);
		node.go(opc[num]).connect(opuesto(opc[num]));
		return findPath(node.go(opc[num]), myPush(pila, opc[num]), nodeF, numM);
	}
	
	function findPath(node,pila,nodeF,numM){//Define un camino según las opciones que posee el nodo.
		node.visitado=false;
		var opc = node.where();
		return (opc.length==0)?deadEnd(node,pila,nodeF,numM):alleyClear(opc,node,pila,nodeF,numM);
	}
	
	return new entidades.Matriz(tabla.dimension, findPath(tabla.control,[],null,0), solucion);
}

module.exports = {
	creaLaberinto : creaLaberinto,
	generaMatriz : generaMatriz
}