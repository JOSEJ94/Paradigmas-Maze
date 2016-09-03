let algoritmo= require('./Algoritmo.js');
let converter = require('./BaseDatos.js');

const tamanoCelda = 50;

//Método que inicializa un laberinto.
function generate(dim){
	let matriz;
	matriz = algoritmo.creaLaberinto(algoritmo.generaMatriz(dim, tamanoCelda, (tamanoCelda * dim) - tamanoCelda));
	return converter.mazeToJson(matriz);
}

module.exports = {
	generate : generate
}