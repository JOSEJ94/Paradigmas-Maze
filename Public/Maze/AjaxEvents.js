//conexiones ajax
function getGen() {
    fetch("/generar", {
            method: "GET"
        }) //hace peticion por ajax, pide generar laberinto al server
        .then((response) => {
            return (response.status === 200) ? response.json() : "Not 200";
        }) //revisa la respuesta del servidor para ver si es correcta
        .then(obj => {
            document.getElementById("msg").innerHTML = JSON.stringify(obj);
        }) //asigna el div asociado con el resultado de la solicitud (para debugging)
        .catch(function error(err) {
            document.getElementById("msg").innerHTML = 'Connection Lost';
            inicio();
        }); //situacion en caso de no conexion
}

function postSave() { //hace peticion de guardado de una partida  del laberinto 
    let name = document.getElementById('name').value; //obtiene nombre de la partida
    fetch("/guardar/" + name, {
            method: "POST"
        }) //inicia solicitud de guardado
        .then((response) => {
            return (response.status === 200) ? response.text() : "error";
        }) //analiza respuesta del servidor
        .then(obj => {
            document.getElementById("msg").innerHTML = obj;
        }) //muestra el resultado en el browser
        .catch(function error(err) {
            localStorage[name] = 'JSON';
            document.getElementById("msg").innerHTML = 'Connection Lost';
        }); //caso sin conexion guarda en localstorage
}

function getLoad() {
    let name = document.getElementById('name').value;
    fetch("/cargar/" + name, {
            method: "GET"
        })
        .then((response) => {
            return (response.status === 200) ? response.json() : "Not 200";
        })
        .then(obj => {
            document.getElementById("msg").innerHTML = JSON.stringify(obj);
        })
        .catch(function error(err) {
            document.getElementById("msg").innerHTML = 'Modelo: ' + localStorage[name] + ' Connection Lost';
        }); //caso sin conexion carga desde localstorage
}