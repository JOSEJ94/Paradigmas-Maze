//conexiones ajax medio controller..
function getGen() {
    let dims = document.getElementById("Dimension").value;
	/*let worker = new Worker('./worker.js');
	worker.addEventListener('message', function(e) {
	console.log('Worker said: ', e.data);
}, false);
	worker.postMessage("go");
	*/
    fetch("/generar/" + dims, {
            method: "GET"
        }) //hace peticion por ajax, pide generar laberinto al server
        .then((response) => {
            return (response.status === 200) ? response.json() : "Not 200";
        }) //revisa la respuesta del servidor para ver si es correcta
        .then(obj => {
            updateView(obj);
            //document.getElementById("msg").innerHTML += 'Generado desde Server <br>';
            setMessage("Generado desde Server");
        }) //asigna el div asociado con el resultado de la solicitud (para debugging)
        .catch(err => {
            //document.getElementById("msg").innerHTML += 'No hay conexion con el servidor<br>';
			console.log(err);
            setMessage("No hay conexion con el servidor");
            letsDoIt();
        }); //situacion en caso de no conexion
}

function postSave() { //hace peticion de guardado de una partida  del laberinto 
    let name = document.getElementById('name').value; //obtiene nombre de la partida
    fetch("/guardar/" + name, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: mazeToJson(matriz)
        }) //inicia solicitud de guardado
        .then(response => {
            return (response.status === 200) ? response.text() : 'No encontrado en server, procediendo a guardado local';
        }) //analiza respuesta del servidor
        .then(obj => {
            //document.getElementById("msg").innerHTML += obj + '<br>';
            setMessage(obj);
        }) //muestra el resultado en el browser
        .catch(function error(err) {
            savingLocaly(name);
        }); //caso sin conexion guarda en localstorage
}

function getLoad() {
    let name = document.getElementById('name').value;
    fetch("/cargar/" + name, {
            method: "GET"
        })
        .then((response) => {
            return (response.status === 200) ? response.json() : 'No encontrado en server, procediendo a carga local<br>';
        })
        .then(obj => {
            updateView(obj);
            //document.getElementById("msg").innerHTML += 'Cargado desde Server <br>';
            setMessage("Cargado desde Server");
        })
        .catch((err) => {
            loadingLocaly(name);
        }); //caso sin conexion carga desde localstorage

    loadingLocaly(name);
}

function savingLocaly(name) { //en caso de no haber conexion al servidor
    //document.getElementById("msg").innerHTML += 'Intentando Guardar Localmente...<br>';
    setMessage("Intentando Guardar Localmente...");
    localStorage[name] = matriz;
    //(localStorage[name]) ? document.getElementById("msg").innerHTML += 'Guardado localmente exitosamente<br>': document.getElementById("msg").innerHTML += 'No se pudo guardar la partida localmente<br>';
    (localStorage[name]) ? setMessage('Guardado localmente exitosamente'): setMessage('No se pudo guardar la partida localmente');
}

function loadingLocaly(name) { // en caso de no haber conexion al servidor
    //document.getElementById("msg").innerHTML += 'Intentando Cargar Localmente...<br>';
    setMessage("Intentando Cargar Localmente...");
    matriz = localStorage[name];
    //(matriz) ? document.getElementById("msg").innerHTML += 'Cargado localmente <br>': document.getElementById("msg").innerHTML += 'No se pudo cargar localmente <br>';
    (matriz) ? setMessage('Cargado localmente'): setMessage('No se pudo cargar localmente');
}