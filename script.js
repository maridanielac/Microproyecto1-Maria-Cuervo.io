document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("ipartida").addEventListener("click", function(event){
        event.preventDefault();
        
        //Validaciones del Nombre
        var jugador1 = document.getElementById("nombre1").value;
        var jugador2 = document.getElementById("nombre2").value;
        var jugador3 = document.getElementById("nombre3").value;
        var jugador4 = document.getElementById("nombre4").value;

        if (jugador1=="" || jugador2=="" | jugador3=="" | jugador4==""){
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }
        alert("El formulario se ha enviado correctamente.");
        document.write(jugador1,"<br>");
        document.write(jugador2,"<br>");
        document.write(jugador3,"<br>")
        document.write(jugador4,"<br>")
    })
    
    
    

    

});

function openTab(evt,tecnologia){
    document.getElementById('juga1').style.display ='none';
    document.getElementById('juga2').style.display ='none';
    document.getElementById('juga3').style.display ='none';
    document.getElementById('juga4').style.display ='none';

    document.getElementsByClassName("tablinks")[0].className = "tablinks";
    document.getElementsByClassName("tablinks")[1].className = "tablinks";
    document.getElementsByClassName("tablinks")[2].className = "tablinks";
    document.getElementsByClassName("tablinks")[3].className = "tablinks";

    document.getElementById(tecnologia).style.display = "block";
    evt.currentTarget.className += "active"; 
}