//paquetes requeridos y configuración
let express = require('express');
let fs = require("fs");
let mongoose = require('mongoose');
var bodyParser = require('body-parser');

const serverPort = 8081;
const dbAddress = 'localhost';

//conectarse a BD
mongoose.connect('mongodb://' + dbAddress + '/maze');
module.exports = mongoose;

//modelo de partida guardada en Base de datos
let SavedGame = require('./models/savedGame');

//crear server
let server = express();
//crear Router
let router = express.Router();

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

//siempre ocurre con cada request
/*
router.use(function(req, res, next) {
	next();
});
*/

router.route('/') //cargar pagina

.get(function(req, res) {
    //
    res.writeHead(200);
    fs.readFile('Public/index.html', null, function(error, data) {
        if (error) {
            res.write("<h1>Err 404: Pagina no encontrada</h1>");
        } else {
            res.write(data);
        }
        //fs.readFile('Pages/index.html',null,(error,data)=>{(error)?res.write("<h1>Err 404: Pagina no encontrada</h1>"):res.write(data);});		
        res.end();
    });
});

router.route('/generar') //generar el laberinto

.get(function(req, res) {
    console.log('generar');
    res.json({
        'nombre': 'Partida guardada',
        'maze': 'JSON'
    });
    res.end();
});

router.route('/cargar/:name')

.get(function(req, res) { //cargar
    console.log('cargar');
    SavedGame.findById({
        _id: req.params.name
    }, function(err, results) {
        if (err)
            console.log('No good');
        else {
            console.log(results.maze);
            res.json(results.maze);
        }
    });
});


router.route('/guardar/:name/:maze')
    .post(function(req, res) { //guardar
        console.log(req.params.action);
		console.log(req.body);
		/*
        let newSavedGame = new SavedGame();
        newSavedGame._id = req.params.name;
        newSavedGame.maze = req.params.maze;
        newSavedGame.save(function(err) {
            if (err)
                console.log('Post ' + err);
            else
                console.log('Guardado');
        });*/
        res.write("<h1>Guardado papu " + req.params.name + " con data "+req.body.data+"!</h1>");
        res.end();
    });

// Registro de rutas

server.use('/', router);
//Para cargar las imagenes y assets del cliente...
server.use(express.static("Public"));
console.log('Server iniciado en ' + serverPort);
console.log('Base de datos disponible en mongodb://' + dbAddress + '/maze');
server.listen(serverPort);