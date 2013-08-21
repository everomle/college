/* 
 * Este archivo contiene toda la logica
 * 
 */

var usuario = null;

//funcion que oculta div
function switchScreenDiv(pDivIdMostrar, pDivIdOculta) {
    $(pDivIdMostrar).show();
    $(pDivIdOculta).hide();
}

// Handler for .ready() called.
$(document).ready(function() {
    $("#candidato").click(function() {
        //Guarda cual de los dos div se le dio click: administ o usuario
        var loginDiv = $("#login");
        loginDiv.data("tipoUsuario", "candidato");
        switchScreenDiv("#login", "#boxRegister");

    });

    $("#administrador").click(function() {
        var loginDiv = $("#login");
        loginDiv.data("tipoUsuario", "administrador");

        switchScreenDiv("#login", "#boxRegister");
    });

    $("#btnLogin").click(function() {

        var tipoUsuario = $("#login").data("tipoUsuario");
        var username = $("#idNombreForm").val();
        var password = $("#passwForm").val();

        if (tipoUsuario == "administrador") {
                                                                                
            usuario = new Usuario("", username, password, tipoUsuario); 
            //Se crea un administrador, si no existe
            function verSiElUsuarioExiste(resultSet) {

                var length = resultSet.rows.length;
                console.log("entro ver si existe usrio");
                if (length == 0) {

                    alert("Lo siento el usuario o password no es correcto");
                } else {
                              
                    usuario.setIdUsuario(resultSet.rows.item(0)["id"]);    
                    
                    switchScreenDiv("#DIVprueba", "#login");
                }
            }

            verificarLogin(usuario, verSiElUsuarioExiste);
        }
        
        return false;

    });


     //Funcion q guarda la Plantilla de una Prueba
    $("#salvarPrueba").click(function() {
       
        var nombreForm = $("#pruebaNombreForm").val();
        var descripForm = $("#descripForm").val();
        var fechaCreacionForm = $("#fechaCreacionForm").val();
        var puntosTotalesForm = $("#puntosTotalesForm").val();
                                       
        var prueba = new Prueba (plantillaPruebaContadorId++, nombreForm, descripForm, fechaCreacionForm, puntosTotalesForm);
        
        guardarPrueba(prueba);
        
        switchScreenDiv("#DIVpregunta", "#DIVprueba");        
        return false;
    });
    
    //Este evenHandler va a obtener el resultado de la sellecion en el form de pregunta
     $("#consultaSelect").change(function(){     
        console.log("entro al change");
        var tipoPreg = $(this).val(); 
        
        if("seleccionUnica" == tipoPreg){
           switchScreenDiv("#seleccionUnica", "#seleccionMultiple , #respuestaCorta");   
        }else if("seleccionMultiple" == tipoPreg){
           switchScreenDiv("#seleccionMultiple", "#seleccionUnica , #respuestaCorta");
        }else if("respuestaCorta" == tipoPreg){
           switchScreenDiv("#respuestaCorta", "#seleccionUnica , #seleccionMultiple");
        }            
    });
    
    
    $("#salvarPregunta").click(function(){
        var textoPreg = $("#textoPregForm").val();
        var tipoPregunta = $("#consultaSelect option:selected").val();
        var puntosForm = $("#puntosForm").val();
        var nivelForm = $("#nivelForm").val();
                                    
        var unaPregunta = new Pregunta (plantillaPruebaContadorId++, plantillaPreguntaContadorId++, textoPreg, tipoPregunta, puntosForm, nivelForm);
        
         if("seleccionUnica" == tipoPreg){
               
        }else if("seleccionMultiple" == tipoPreg){
           switchScreenDiv("#seleccionMultiple", "#seleccionUnica , #respuestaCorta");
        }else if("respuestaCorta" == tipoPreg){
          var unaRespuesta = new Respuesta(0, $( "#textrespuestaCorta" ).val ());
          unaPregunta.addRespuesta(unaRespuesta);
        }   
        
        //guardar la pregunta con su tipo de respuesta en la base de datos
        guardarPregunta (unaPregunta);
        
    });
});

