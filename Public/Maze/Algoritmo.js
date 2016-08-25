//==================================================
//===============Método genera matriz===============
//==================================================
function generaMatriz(dim,tam,esp){//Retorna el nodo superior izquierdo de la matriz.
	var primero = new Nodo(tam, esp, esp);//Último nodo.
	function CC(raiz, newO, newS, i, j, n,x,y){//Caso continuo (Genera las filas).
		var node = new Nodo(tam, x+tam, y);
		node.oeste=newO; newO.este=node; node.sur=newS; newS.norte=node;
		return (j+1<n) ? CM(raiz,node,newS.este,i,j+1,n,x+tam,y) :
			(i+1<n) ? CM(raiz,null,raiz.este,i+1,0,n,x+tam,y) : raiz;
	}
	function CL(raiz,newS,i,j,n,x,y){//Caso lateral (Inicia las columnas que son la base de las filas).
		var aux = new Nodo(tam,0,y-tam); var node = new Nodo(tam,tam,y-tam);
		raiz.norte=aux; aux.sur=raiz; node.oeste=aux; aux.este=node; node.sur=newS; newS.norte=node;
		return (j+2<n) ? CM (aux, node, newS.este, i, j+2, n,tam,y-tam) :
			(i+1<n) ? CM(aux, null, aux.este, i+1, 0, n,tam,y-tam) : aux;
	}
	function CI(raiz,i,j,n,x,y){//Caso inicial (Crea la primera fila que es la base de todo).
		var node = new Nodo(tam, x-tam, y);
		node.este=raiz; raiz.oeste=node;
		return (j+1<n) ? CM(node, null, null, i, j+1, n,x-tam,y) :
			(i+1<n) ? CM(node, null, node.este, i+1, 0, n,x-tam,y) : node;
	}
	function CM(raiz,newO,newS,i,j,n,x,y){//Método que define qué sigue.
		return (newO) ? CC(raiz,newO,newS,i,j,n,x,y) :
			(newS) ? CL(raiz,newS,i,j,n,x,y):CI(raiz,i,j,n,x,y);
	}
	return CM(primero,null,null,0,1,dim,esp,esp);
}

//==================================================
//=============Método genera laberinto.=============
//==================================================
function creaLaberinto(tabla){//Falta bloquear caminos.
	function getRandom(min, max){
		return Math.floor((Math.random() * max) + min);
	}
	function opuesto(n){
		return (n<3)?(n+2):(n-2);
	}
	function CS(node, pila){//Callejón sin salida -> Hace backtracking.
		return (pila.length==0)?node:EC(node.go(opuesto(pila.pop())), pila);
	}
	function CD(opc, node, pila){//Callejón despejado -> Avanza en el grafo.
		var num=getRandom(0,opc.length); pila.push(opc[num]);
		node.connect(opc[num]); node.go(opc[num]).connect(opuesto(opc[num]));
		return EC(node.go(opc[num]), pila);
	}
	function EC(node, pila){//Define un camino según las opciones que posee el nodo.
		node.visitado=false;
		var opc = node.where();
		return (opc.length==0)?CS(node,pila):CD(opc,node,pila);
	}
	return EC(tabla.control,[]);
}