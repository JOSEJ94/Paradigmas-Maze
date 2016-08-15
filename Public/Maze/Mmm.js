class Nodo {
	constructor(v = false) {
		this.visitado = v;
		this.posicionado = false;
		this.norte = null;
		this.este = null;
		this.sur = null;
		this.oeste = null;
	}
	where(){
		var opc = [];
		if (this.norte) if (!this.norte.visitado) opc.push(1);
		if (this.este) if (!this.este.visitado) opc.push(2);
		if (this.sur) if (!this.sur.visitado) opc.push(3);
		if (this.oeste) if (!this.oeste.visitado) opc.push(4);
		return opc;
	}
	go(n){
		switch(n){
			case 1: return this.norte;
			case 2: return this.este;
			case 3: return this.sur;
			case 4: return this.oeste;
		}
	}	
	static from(plain){
		var node = new Nodo(plain.visitado);
		node.posicionado=plain.posicionado;
		node.norte=plain.norte;
		node.este=plain.este;
		node.sur=plain.sur;
		node.oeste=plain.oeste;
		return node;
	}
	static to(node) {
		return {
			_class: 'Nodo',
			visitado: node.visitado,
			posicionado: node.posicionado,
			norte: node.norte,
			este: node.este,
			sur: node.sur,
			oeste: node.oeste
		};
	}
}

class Matriz {
	constructor(d = 0){
		this.control = null;
		this.dimension = d;
	}
	static from(plain) {
		var matriz = new Matriz(plain.dimension);
		matriz.control = plain.control;
		return matriz;
	}
	static to() {
		return {
			_class: 'Matriz',
			control: matriz.control,
			visitado: matriz.visitado
		};
	}
}