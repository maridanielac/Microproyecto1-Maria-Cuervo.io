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
    })
    
    
    document.write(jugador2,"<br>")
    document.write(jugador3,"<br>")
    document.write(jugador4,"<br>")

    

});

function opcion(){
    var taman=document.getElementById("tamano").value;
    if (taman!= "3" | taman!= "3"| taman!= "3"){
        alert("Por favor ingresa un tamaño válido entre 3 y 5");
    }

}

function verJugador1(){
    document.write(jugador1);

}