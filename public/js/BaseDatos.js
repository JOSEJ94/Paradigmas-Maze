function copyNode(node){
	var newNode = new Nodo(node.tamanyo, node.ejeX, node.ejeY);
	newNode.visitado=node.visitado;
	newNode.nodoFinal=node.nodoFinal;
	newNode.conexiones=node.conexiones;
	newNode.norte=node.norte;
	newNode.este=node.este;
	newNode.sur=node.sur;
	newNode.oeste=node.oeste;
    return newNode;
}

function revive(k,v){//Define el tipo de objeto que se recupera.
	if (v instanceof Object && v._class == 'Matriz')
		return Matriz.from(v);
	if (v instanceof Object && v._class == 'Nodo')
		return Nodo.from(v);
	return v;
}

function replacer(k,v){//Define el tipo de objeto que se guarda.
	if (v instanceof Matriz)
		return Matriz.to(v);
	if (v instanceof Nodo)
		return Nodo.to(v);
	return v;
}

//Convierte una matriz (Con el laberinto adentro) en un string de JSON.
function mazeToJson(matriz){
	var toJSON = [matriz.dimension, matriz.solucion];
	function limpiaConexiones(node){
		node.norte=null; node.este=null;
		node.sur=null; node.oeste=null;
		return node;
	}
	function toCode(a, raiz, node, i, j, n){//UN PUSH!!!
		var aN, aR;
		aR = (j==1) ? raiz.sur : raiz;
		aN=node.este;		
		a.push(limpiaConexiones(node));		
		return (j<n) ? toCode(a, aR, aN, i, j+1, n) : (i<n) ? toCode(a, aR, aR, i+1, 1, n) : JSON.stringify(a);
	}	
	return toCode(toJSON, matriz.control, matriz.control, 1, 1, matriz.dimension);
}

//Convierte un string de JSON a una matriz (Con el laberinto adentro).
function JsonToMaze(code){	
	let fixNodes = (a) => a.map((e)=> copyNode(e));	
	let fromJSON = JSON.parse(code, revive);	
	let nodesJSON = fixNodes(fromJSON.slice(2, fromJSON.length));	
	
	function addNode(nA, oA, node, i, n){//UN PUSH!!!
		nA.push(node);
		return (i<(oA.length-1))?simplify(nA, oA, oA[i+1], oA[i+1], i+2, n):nA;
	}	
	function simplify(nA, oA, raiz, node, i, n){
		node.este=oA[i];
		oA[i].oeste=node;
		return ((i+1)%n==0)?addNode(nA, oA, raiz, i, n):simplify(nA, oA, raiz, oA[i], i+1, n);
	}
	function connectNode(nodeA, nodeB){
		nodeA.sur=nodeB;
		nodeB.norte=nodeA;
		return (nodeA.este!=null)?connectNode(nodeA.este, nodeB.este):true;//Que tramposo soy xD
	}
	function toMatriz(nA, i, n){
		connectNode(nA[i], nA[i+1]);
		return ((i+2)<n) ? toMatriz(nA, i+1, n) : nA[0];
	}
	return new Matriz(
		fromJSON[0],
		toMatriz(simplify([], nodesJSON, nodesJSON[0], nodesJSON[0], 1, fromJSON[0]), 0, fromJSON[0]),
		fromJSON[1]
	);
}