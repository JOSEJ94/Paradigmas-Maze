//==================================================
//===================Objeto Nodo.===================
//==================================================
function Nodo(t,x,y){
	this.Nodo(t,x,y);
}
Nodo.prototype={
	visitado: true,
	tamanyo: 0,
	ejeX: 0,
	ejeY: 0,
	conexiones: [],
	norte: null,
	este: null,
	sur: null,
	oeste: null,
	Nodo: function(t,x,y){
		this.visitado= true;
		this.tamanyo= t;
		this.ejeX= x;
		this.ejeY= y;
		this.conexiones= [];
		this.norte= null;
		this.este= null;
		this.sur= null;
		this.oeste= null;
	},
	where:function(){
		var opc = [];
		if(this.norte) if(this.norte.visitado) opc.push(1);
		if(this.este) if(this.este.visitado) opc.push(2);
		if(this.sur) if(this.sur.visitado) opc.push(3);
		if(this.oeste) if(this.oeste.visitado) opc.push(4);
		return opc;
	},
	go:function(n){
		switch(n){
			case 1: return this.norte;
			case 2: return this.este;
			case 3: return this.sur;
			case 4: return this.oeste;
		}
	},
	connect:function(num){
		this.conexiones.push(num);
	}
};
Nodo.from= function(plain){
	var node = new Nodo(plain.ejeX, plain.ejeY);
	node.posicionado=plain.posicionado;
	node.conexiones=plain.conexiones;
	node.norte=plain.norte;
	node.este=plain.este;
	node.sur=plain.sur;
	node.oeste=plain.oeste;
	return node;
}
Nodo.to= function(node){
	return{
        _class: 'Nodo',
		visitado: node.visitado,
		ejeX: node.ejeX,
		ejeY: node.ejeY,
		conexiones: node.conexiones,
		norte: node.norte,
		este: node.este,
		sur: node.sur,
		oeste: node.oeste
    };
}

//==================================================
//Objeto Matriz.
//==================================================
function Matriz(d){
	this.Matriz(d);
}
Matriz.prototype={
	control: null,
	dimension: 0,
	Matriz: function(d){
		this.control= null;
		this.dimension= d;
	}
};
Matriz.from= function(plain){
	var matriz = new Matriz(plain.dimension);
	matriz.control=plain.control;
	return matriz;
}
Matriz.to= function(matriz){
	return{
        _class: 'Matriz',
		control: matriz.control,
		visitado: matriz.visitado
    };
}