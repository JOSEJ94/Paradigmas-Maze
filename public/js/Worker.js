importScripts("Algoritmo.js", "BaseDatos.js", "Entidades.js");

let decode = (a) => [parseInt(a.slice(0, a.indexOf("-"))),
					parseInt(a.slice(a.indexOf("-")+1, a.indexOf("="))),
					parseInt(a.slice(a.indexOf("=")+1, a.length))];

let startMaze = (dim, tam_1, tam_2) => creaLaberinto(generaMatriz(dim, tam_1, tam_2));

self.addEventListener("message", (e) => {
	let parameters = decode(e.data);
	console.log(parameters);
	let vodoo = startMaze(parameters[0], parameters[1], parameters[2]-parameters[1]);
	console.log(vodoo);
	//let x = mazeToJson(vodoo);
	//console.log(x);
	self.postMessage();
});