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
    where() {
        let opc1 = [], opc2, opc3, opc4, opc5;
        (this.norte) ? (this.norte.visitado) ? opc2 = myPush(1, opc1) : opc2 = opc1 : opc2 = opc1;
		(this.este ) ? (this.este.visitado ) ? opc3 = myPush(2, opc2) : opc3 = opc2 : opc3 = opc2;
		(this.sur  ) ? (this.sur.visitado  ) ? opc4 = myPush(3, opc3) : opc4 = opc3 : opc4 = opc3;
		(this.oeste) ? (this.oeste.visitado) ? opc5 = myPush(4, opc4) : opc5 = opc4 : opc5 = opc4;
        return opc5;
    }
    go(n) {
		return this.switchN.getFunction(n)();
    }
    connect(num) {
        this.conexiones.concat(num);
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