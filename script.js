document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("ipartida").addEventListener('click', function(event)){
        event.preventDefault();
        
        //Validaciones del Nombre
        var jugador1 = document.getElementById("nombre1").value();
        var jugador2 = document.getElementById("nombre2").value();
        var jugador3 = document.getElementById("nombre3").value();
        var jugador4 = document.getElementById("nombre4").value();

        if (jugador1=="" || jugador2=="" | jugador3=="" | jugador4==""){
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }
        alert("El formulario se ha enviado correctamente.");
    }
});