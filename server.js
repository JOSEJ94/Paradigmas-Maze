let express = require('express');
let fs = require("fs");
let mongoose = require('mongoose');
const serverPort=8081;
const dbAddress='localhost';

let server = express();
mongoose.connect('mongodb://'+dbAddress+'/maze');

//Schema de guardado JSON
let saveSchema ={
	name:String,
	maze:String
}
let save = mongoose.model('Product',saveSchema);


server.get('/',function(req,res){
	res.writeHead(200,{'Content-type':'text/html'});
	fs.readFile('Pages/index.html',null,function(error,data){
	if(error){
		res.writeHead(404);
		res.write("<h1>Err 404: Pagina no encontrada</h1>");
	}else
		res.write(data);
	res.end();
	});
});

server.get('/:action',function(req,res){
	console.log(req.params['action']);
	res.writeHead(200);
	console.log('mensaje');
	res.write("<h1>Generar</h1>");
	res.end();
});

server.get('/:action/:nombre',function(req,res){
	console.log(req.params['nombre']);
	res.writeHead(200);
	console.log('mensaje');
	if(req.params['action']=='cargar')
		res.write("<h1>Cargar</h1>");
	res.end();
});

server.post('/:action/:nombre',function(req,res){
	console.log(req.params['nombre']);
	res.writeHead(200);
	console.log('mensaje');
	if(req.params['action']=='guardar'){
		res.write("<h1>Guardar</h1>");
		var guardado ={
		name: 'Primera Partida',
		maze: '{"jason":"jason"}'			
		}
		var actual= new save(guardado);
		actual.save(function(err){
			console.log(actual);
			
		});
	}
	res.end();
});


console.log('Server iniciado en '+serverPort);
server.listen(serverPort);