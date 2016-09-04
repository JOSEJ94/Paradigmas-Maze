//Método que copia los nodos.
function copyNode(node) {
    let newNode = new Nodo(node.tamanyo, node.ejeX, node.ejeY);
    newNode.visitado = node.visitado;
    newNode.nodoFinal = node.nodoFinal;
    newNode.conexiones = node.conexiones;
    newNode.norte = node.norte;
    newNode.este = node.este;
    newNode.sur = node.sur;
    newNode.oeste = node.oeste;
    return newNode;
}

//Define el tipo de objeto que se recupera.
function revive(k, v) {
    if (v instanceof Object && v._class == 'Matriz')
        return Matriz.from(v);
    if (v instanceof Object && v._class == 'Nodo')
        return Nodo.from(v);
    return v;
}

//Define el tipo de objeto que se guarda.
function replacer(k, v) {
    if (v instanceof Matriz)
        return Matriz.to(v);
    if (v instanceof Nodo)
        return Nodo.to(v);
    return v;
}

//Convierte una matriz (Con el laberinto adentro) en un string de JSON.
function mazeToJson(matriz) {
    let toJSON = [matriz.dimension, matriz.solucion];

    //Borra las conexiones entre nodos para no enciclar el stringify.
    function limpiaConexiones(node) {
        node.norte = null;
        node.este = null;
        node.sur = null;
        node.oeste = null;
        return node;
    }

    //Recorre la matriz guardando los nodos en orden en un array.
    function toCode(a, raiz, node, i, j, n) {
        let aN, aR;
        aR = (j == 1) ? raiz.sur : raiz;
        aN = node.este;
        let a2 = myPush(a, limpiaConexiones(node));
        return (j < n) ? toCode(a2, aR, aN, i, j + 1, n) :
            (i < n) ? toCode(a2, aR, aR, i + 1, 1, n) : JSON.stringify(a2);
    }
    return toCode(toJSON, matriz.control, matriz.control, 1, 1, matriz.dimension);
}

//Convierte un string de JSON a una matriz (Con el laberinto adentro).
function JsonToMaze(code) {
    //Los nodos que pasan por el parse no tienen métodos, este método los arregla.
    let fixNodes = (a) => a.map((e) => copyNode(e));

    //Cada vez que se termina de conectar una fila de la matriz se añade a otro array más simple.
    function addNode(nA, oA, node, i, n) {
        nA2 = myPush(nA, node);
        return (i < (oA.length - 1)) ? simplify(nA2, oA, oA[i + 1], oA[i + 1], i + 2, n) : nA2;
    }

    //Conecta entre nodos los puntos este y oeste (Simplifica el reconectar).
    function simplify(nA, oA, raiz, node, i, n) {
        node.este = oA[i];
        oA[i].oeste = node;
        return ((i + 1) % n == 0) ? addNode(nA, oA, raiz, i, n) : simplify(nA, oA, raiz, oA[i], i + 1, n);
    }

    //Conecta entre nodos los puntos norte y sur.
    function connectNode(nodeA, nodeB) {
        nodeA.sur = nodeB;
        nodeB.norte = nodeA;
        return (nodeA.este != null) ? connectNode(nodeA.este, nodeB.este) : true; //Que tramposo soy xD
    }

    //Vuelve a armar una matriz con los nodos de un array ya simplificado.
    function toMatriz(nA, i, n) {
        connectNode(nA[i], nA[i + 1]);
        return ((i + 2) < n) ? toMatriz(nA, i + 1, n) : nA[0];
    }

    let fromJSON = JSON.parse(code, revive);
    let nodesJSON = fixNodes(fromJSON.slice(2, fromJSON.length));
    let nodesSimplify = simplify([], nodesJSON, nodesJSON[0], nodesJSON[0], 1, fromJSON[0]);
    return new Matriz(
        fromJSON[0], //Dimensión de la matriz.
        toMatriz(nodesSimplify, 0, fromJSON[0]), //Nodo por el cual comienza el laberinto.
        fromJSON[1] //Camino que lleva directamente al final del laberinto.
    );
}