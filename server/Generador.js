let algoritmo= require('./Algoritmo.js');
let entidades = require('./Entidades.js');

const tamanoCelda = 50;
let matriz;

//Método que inicializa un laberinto.
function generate(dim){
	matriz = new entidades.Matriz(dim);
	matriz.control = algoritmo.generaMatriz(dim,tamanoCelda,(tamanoCelda*dim)-tamanoCelda);
	matriz.control = algoritmo.creaLaberinto(matriz);	
	return matriz;
}

module.exports = {
	generate : generate
}