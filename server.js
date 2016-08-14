
//paquetes requeridos y configuración
let express = require('express');
let fs = require("fs");
let mongoose = require('mongoose');

const serverPort=8081;
const dbAddress='localhost';

//conectarse a BD
mongoose.connect('mongodb://'+dbAddress+'/maze');
module.exports = mongoose;

//modelo de partida guardada en Base de datos
let SavedGame = require('./models/savedGame');

//crear server
let server = express();
//crear Router
let router = express.Router();

//siempre ocurre con cada request
router.use(function(req, res, next) {
	next();
});

router.route('/')    //cargar pagina

	.get(function(req, res) {
		res.writeHead(200,{'Content-type':'text/html'});
		fs.readFile('Public/index.html',null,function(error,data){
		if(error){
			res.writeHead(404);
			res.write("<h1>Err 404: Pagina no encontrada</h1>");
		}else
			res.write(data);
		//fs.readFile('Pages/index.html',null,(error,data)=>{(error)?res.write("<h1>Err 404: Pagina no encontrada</h1>"):res.write(data);});
		
		res.end();
		});
	})
;
		
router.route('/:action')    //generar el laberinto

	.get(function(req, res) {
		console.log(req.params.action);
		if(req.params.action=='generar'){
		    res.json({ 'nombre':'Partida guardada', 'maze':'JSON'});
		}
		res.end();
	})
;

router.route('/:action/:name') 

	.get(function(req, res) {//cargar
		console.log(req.params.action);
		if(req.params.action=='cargar')
			res.json(req.params.name);
			SavedGame.find({name:req.params.name},function(err, results) {
			if (err)
				console.log('No good');
			else{
				console.log(results);
				//res.send(results); //error
				//res.json(results);
			}
		});
		res.end();
	})
	
	.post(function(req, res) {   //guardar
		console.log(req.params.action);
		res.writeHead(200);
		if(req.params.action=='guardar'){
			let newSavedGame = new SavedGame();
			newSavedGame.name = req.params.name;
			newSavedGame.maze = 'JSON';
			newSavedGame.save(function(err) {
			if (err)
				console.log('Post ' + err);  
			else
				console.log('Guardado'); 
			});
			res.write("<h1>Guardado papu "+req.params.name+"!</h1>");
			}
		res.end();
	})
;

// Registro de rutas
server.use('/', router);

console.log('Server iniciado en '+serverPort);
console.log('Base de datos disponible en mongodb://'+dbAddress+'/maze');
server.listen(serverPort);