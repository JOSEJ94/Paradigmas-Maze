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
    }
    where() {
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
        switch (n) {
            case 1:
                return this.norte;
            case 2:
                return this.este;
            case 3:
                return this.sur;
            case 4:
                return this.oeste;
        }
    }
    connect(num) {
        this.conexiones.push(num);
    }
}

//==================================================
//==================Objeto Matriz.==================
//==================================================
class Matriz {
    constructor(d = 0) {
        this.control = null;
        this.dimension = d;
    }
    static from(plain) {
        let matriz = new Matriz(plain.dimension);
        matriz.control = plain.control;
        return matriz;
    }
    static to(matriz) {
        return {
            _class: 'Matriz',
            control: matriz.control,
            visitado: matriz.visitado
        };
    }
}

module.exports = {
	Matriz : Matriz,
	Nodo : Nodo
}