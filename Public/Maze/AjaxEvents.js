    //cosas probadas y que no funcionan del todo
    /*$(document).ready(function(){
    	    $("#gen").click(function(){
    	    // Request de Ajax (es una promesa) estilo callback
    	    $.ajax({url: '/generar', 
    			   type:'GET',
    			   dataType:'json'

    			 }).done(function(result){
    					alert(result);
    			         //$("#msg").innerHTML = '<H3>FUNCIONA</H3>';
    					})
    			  .fail(function(e){alert(e);});
    		}); 
        });*/
    function getGen() {
        let ajax = new XMLHttpRequest();
        let url = "/generar";
        ajax.open("GET", url, true);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === 4 && ajax.status === 200)
                document.getElementById('msg').innerHTML = ajax.responseText;
        };
        ajax.send();
    }


    function postSave() {
        let ajax = new XMLHttpRequest();
        let name = document.getElementById('name').value;
        let url = "/guardar/" + name;
        ajax.open("POST", url, true);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === 4 && ajax.status === 200)
                document.getElementById('msg').innerHTML = ajax.responseText;
        };
        ajax.send();
    }

    function getLoad() {
        let ajax = new XMLHttpRequest();
        let name = document.getElementById('name').value;
        let url = "/cargar/" + name;
        ajax.open("GET", url, true);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === 4 && ajax.status === 200)
                document.getElementById('msg').innerHTML = ajax.responseText;
        };
        ajax.send();
    }