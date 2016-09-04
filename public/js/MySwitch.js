//==================================================
//==================Objeto Switch.==================
//==================================================
class mySwitch {
    constructor(a = []) {
        this.funciones = a;
    }
    getFunction(n) {
        return this.funciones[n];
    }
}