class Model {
    constructor() {
        this.matriz = undefined;
        this.actual = undefined;
        this.winner = true;
    }

    setModel(newMatriz) {
        this.matriz = newMatriz;
        this.actual = this.matriz.control;
        this.actual.visitado = true;
        this.winner = false;
        document.dispatchEvent(evento);
    }
}
let modelo;