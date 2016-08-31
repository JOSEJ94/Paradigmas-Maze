let algoritmo= require('./Algoritmo.js');
let entidades = require('./Entidades.js');

const tamanoCelda = 50;
let matriz;

//Método que inicializa un laberinto.
function generate(dim){
	/*matriz = new entidades.Matriz(dim);
	matriz.control = algoritmo.generaMatriz(dim,tamanoCelda,(tamanoCelda*dim)-tamanoCelda);
	matriz.control = algoritmo.creaLaberinto(matriz);*/	
	matriz = algoritmo.creaLaberinto(algoritmo.generaMatriz(dim, tamanoCelda, (tamanoCelda * dim) - tamanoCelda));
	return matriz;
}

/*function startMaze(dim, tam_1, tam_2) {
    matriz = creaLaberinto(generaMatriz(dim, tam_1, tam_2));
	actual = matriz.control;
	actual.visitado=true;
}*/

module.exports = {
	generate : generate
}