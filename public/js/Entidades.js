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
}