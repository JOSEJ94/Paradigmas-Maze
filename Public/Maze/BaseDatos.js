
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

function mazeToJson(matriz){//Convierte una matriz (Con el laberinto adentro) en un string de JSON.
	var toJSON = [matriz.dimension];
	function limpiaConexiones(node){
		node.norte=null; node.este=null;
		node.sur=null; node.oeste=null;
		return node;
	}
	function toCode(arr, raiz, node, i, j, n){
		var aN, aR;
		aR = (j==1) ? raiz.sur : raiz;
		if(node)
			aN=node.este;
		else
			 return JSON.stringify(arr) ;
		arr.push(limpiaConexiones(node));		
		return (j<n) ? toCode(arr,aR,aN,i,j+1,n) : (i<n) ? toCode(arr,aR,aR,i+1,1,n) : JSON.stringify(arr);
	}	
	return toCode(toJSON,matriz.control,matriz.control,1,1,matriz.dimension);
}

function JsonToMaze(code){//Convierte un string de JSON a una matriz (Con el laberinto adentro).
	//Cambiar nombres a algunas variables para simplificar.
	var fromJSON = JSON.parse(code, revive);
	var dim = fromJSON[0];
	function addNode(newArray, oldArray, node, i, n){
		newArray.push(node);
		return (i<(oldArray.length-1))?simplificar(newArray, oldArray, oldArray[i+1], oldArray[i+1], i+2, n):newArray;
	}	
	function simplificar(newArray, oldArray, raiz, node, i, n){
		node.este=oldArray[i];
		oldArray[i].oeste=node;
		return (i%n==0)?addNode(newArray, oldArray, raiz, i, n):simplificar(newArray, oldArray, raiz, oldArray[i], i+1, n);
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
	var matriz = new Matriz(dim);
	matriz.control=toMatriz(simplificar([], fromJSON, fromJSON[1], fromJSON[1], 2, dim), 0, dim)
	return matriz;
}
