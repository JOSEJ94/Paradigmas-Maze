//==================================================
//===================Objeto Nodo.===================
//==================================================
class Nodo {
    constructor(t = 0, x = 0, y = 0) {
        this.visitado = true;
        this.nodoFinal = false;
        this.tamanyo = t;
        this.ejeX = x;
        this.ejeY = y;
        this.conexiones = [];
        this.norte = null;
        this.este = null;
        this.sur = null;
        this.oeste = null;
		this.switchN = new mySwitch([
			null,
			() => this.norte,
			() => this.este,
			() => this.sur,
			() => this.oeste
		]);
    }
    where() {//UN PUSH!!!
        let opc = [];
        if (this.norte)
            if (this.norte.visitado) opc.push(1);
        if (this.este)
            if (this.este.visitado) opc.push(2);
        if (this.sur)
            if (this.sur.visitado) opc.push(3);
        if (this.oeste)
            if (this.oeste.visitado) opc.push(4);
        return opc;
    }
    go(n) {
		return this.switchN.getFunction(n)();
    }
    connect(num) {
        this.conexiones.push(num);
    }
	/*static from(plain) {
        let node = new Nodo(plain.tamanyo, plain.ejeX, plain.ejeY);
		node.visitado=plain.visitado;
		node.nodoFinal=plain.nodoFinal;
		node.conexiones=plain.conexiones;
		node.norte=plain.norte;
		node.este=plain.este;
		node.sur=plain.sur;
		node.oeste=plain.oeste;
		node.switchN=plain.switchN;
        return node;
    }
    static to(node) {
        return {
            _class: 'Nodo',
            visitado: node.visitado,
			nodoFinal: node.nodoFinal,
			tamanyo: node.tamanyo,
			ejeX: node.ejeX,
			ejeY: node.ejeY,
			conexiones: node.conexiones,
			norte: node.norte,
			este: node.este,
			sur: node.sur,
			oeste: node.oeste,
			switchN: node.switchN
			};
    }*/
}

//==================================================
//==================Objeto Matriz.==================
//==================================================
class Matriz {
    constructor(d = 0, c = null, s = null) {
        this.control = c;
		this.solucion = s;
        this.dimension = d;
    }
    /*static from(plain) {
        let matriz = new Matriz(plain.dimension, plain.control, plain.solucion);
        return matriz;
    }
    static to(matriz) {
        return {
            _class: 'Matriz',
            control: matriz.control,
            solucion: matriz.solucion,
			dimension: matriz.dimension
        };
    }*/
}

//==================================================
//==================Objeto Switch.==================
//==================================================
class mySwitch {
	constructor(a = []) {
		this.funciones = a;
    }
	getFunction(n){
		return this.funciones[n];
	}
	static from(plain) {
        let newSwitch = new mySwitch(plain.funciones);
        return newSwitch;
    }
    static to(newSwitch) {
        return {
            _class: 'mySwitch',
            funciones: newSwitch.funciones
        };
    }
}

module.exports = {
	Matriz : Matriz,
	Nodo : Nodo,
	mySwitch : mySwitch
}