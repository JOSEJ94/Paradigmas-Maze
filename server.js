//paquetes requeridos y configuración
let express = require('express');
let fs = require("fs");
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let generator = require('./server/Generador.js');

//parametros de configuración del server y la base de datos.
const serverPort = 8081;
const dbAddress = 'localhost';
const db = 'maze';

//conectarse a BD
mongoose.connect('mongodb://' + dbAddress + '/'+db);
//configurar promesas de Mongoose para que sean igual que las nativas
mongoose.Promise = global.Promise;
module.exports = mongoose;

//modelo de partida guardada en Base de datos
let SavedGame = require('./models/savedGame');

//crear server
let server = express();
//crear Router
let router = express.Router();

//para request que contengan body...
server.use(bodyParser.urlencoded({
    extended: false
}))
server.use(bodyParser.json());

router.route('/') //cargar pagina
    .get((req, res) => {
        //
        res.writeHead(200);
        fs.readFile('Public/index.html', null, (error, data) => {
            (error) ? res.write("<h1>Err 404: Pagina no encontrada</h1>"): res.write(data);
            res.end();
        });
    });

router.route('/generar/:dim') //generar el laberinto
    .get((req, res) => {
        console.log('Generar laberinto de ' + req.params.dim + 'x' + req.params.dim);
        res.json(generator.generate(req.params.dim));
		console.log('Generado con exito');
    });

router.route('/cargar/:name') //cargar
    .get((req, res) => {
        console.log('Cargar laberinto con nombre: ' + req.params.name);
        let query = SavedGame.findOne({
            _id: req.params.name
        });
        query.exec().catch(err => {
            console.log('error');
            res.sendStatus(400);
			res.end();
        }).then(result => res.json(result.maze)).then(obj => console.log('Encontrada la partida y enviada al solicitante'));
    });

router.route('/guardar/:name') //guardar
    .post((req, res) => {
        console.log('Guardar laberinto con nombre: ' + req.params.name);
        let insert = new SavedGame({
            _id: req.params.name,
            maze: JSON.stringify(req.body)
        });
        insert.save().then(a => {
            console.log('Guardado con nombre: ' + req.params.name);
            res.write("Laberinto " + req.params.name + " guardado exitosamente!");
            res.end();
        }).catch(err => {
            console.log('Error al guardar partida... Llave duplicada');
			res.write("Laberinto " + req.params.name + " no se pudo guardar porque existe otra partida con ese nombre");
            res.end();
        });
    });

// Registro de rutas
server.use('/', router);
//Para cargar las imagenes y assets del cliente...
server.use(express.static("public"));
console.log('Server iniciado en ' + serverPort);
console.log('Base de datos disponible en mongodb://' + dbAddress + '/maze');
server.listen(serverPort);