let tamC= 50;
let matriz;
let actual;


//Método que inicializa una partida.
/*

var worker = new Worker('doWork.js');

worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);
}, false);

worker.postMessage('Hello World'); // Send data to our worker.
doWork.js (the worker):

self.addEventListener('message', function(e) {
  self.postMessage(e.data);
}, false);



*/

self.addEventListener('message', function(e) {
  //startMaze(e.data, tamC, (tamC * dim)-tamC);
  self.postMessage("dummy");
}, false);

//Método que inicializa un laberinto.
function startMaze(dim, tam_1, tam_2) {
    matriz = creaLaberinto(generaMatriz(dim, tam_1, tam_2));
	actual = matriz.control;
	actual.visitado=true;
}

