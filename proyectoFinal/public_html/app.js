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
//------------------------------- Metodos utilizados al "Logearse" ---------------------------------------- //
//---------------------------------------------------------------------------------------------------------- //
$(document).ready(function() {
    $("#candidato").click(function() {
        //Guarda cual de los dos div se le dio click: administ o usuario
        var loginDiv = $("#login");
        loginDiv.data("tipoUsuario", "candidato");
        $("#btnRegistrarse").show();
        switchScreenDiv("#login", "#boxRegister");

    });

    $("#administrador").click(function() {
        var loginDiv = $("#login");
        loginDiv.data("tipoUsuario", "administrador");
        $("#btnRegistrarse").hide();
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
            
        } else  if (tipoUsuario == "candidato"){                       		
            
            usuario = new Usuario("", username, password, tipoUsuario); 
            //Se crea un candidato, si no existe
            function verSiElUsuarioExiste(resultSet) {

                var length = resultSet.rows.length;
                console.log("entro ver si existe usrio");
                if (length == 0) {

                    alert("Lo siento el usuario o password no es correcto");
                } else {
                              
                    usuario.setIdUsuario(resultSet.rows.item(0)["id"]);    
                    
                    switchScreenDiv("#DIVcandidato", "#login");
                }
            }
            
            verificarLoginCandidato(usuario, verSiElUsuarioExiste);
			
	}
        
        return false;

    });
    
   //------------------------------- Metodos utilizados para tipo Candidato -------------------------------- //
  //---------------------------------------------------------------------------------------------------------- //
    
     $("#btnRegistrarse").click(function() {
        switchScreenDiv("#DIVcandidato", "#login");
       
    });
    
    $("#agregarCandidato").click(function() {
        var idNombreForm = $("#idNombreCandidatoForm").val();
        var passwForm = $("#passwCandidatoForm").val();
        var nombreCandidatoForm = $("#nombreCandidatoForm").val();
        var cedulaForm = $("#cedulaForm").val();
        var nacimientoForm = $("#nacimientoForm").val();
        var nivelAcadForm = $("#nivelAcadCandidatoForm").val();
        var descripcionForm = $("#descripcionCandidatoForm").val();
   
        var newCandidato = new Candidato(idNombreForm, nombreCandidatoForm, passwForm, "candidato", nombreCandidatoForm, cedulaForm, nacimientoForm, nivelAcadForm, descripcionForm);
        
        insertarCandidato(newCandidato);
    });
    
    

  //------------------------------- Metodos utilizados para tipo Administrador-------------------------------- //
  //---------------------------------------------------------------------------------------------------------- //
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
    
    /*Salva la pregunta con las respuestas y la opcion correcta del Formulario Administrador*/
    $("#salvarPregunta").click(function(){
        var textoPreg = $("#textoPregForm").val();
        var tipoPregunta = $("#consultaSelect option:selected").val();
        var puntosForm = $("#puntosForm").val();
        var nivelForm = $("#nivelForm").val();
        var opcionCorrecta = "";   /*obsvr linea101: no agrego arrey de misRespuesta porq este fue creado dentro del objeto*/                
        var unaPregunta = new Pregunta (plantillaPruebaContadorId, plantillaPreguntaContadorId++, textoPreg, tipoPregunta, puntosForm, nivelForm, opcionCorrecta);
        
        /*De tipo:seleccionUnica se saca y se guardan los valores en un arrayMisRespuestas, y  a su vez sacamos la "opcionCorrecta"  */
        /*Encontrms 2procesos: guardar la opcionCorrect selec x ADMIN y agregar las todas las Respuestas a la Pregunta*/
         if("seleccionUnica" == tipoPregunta){
            opcionCorrecta = $('#seleccionUnica input:radio[name=selecUnica]:checked').val(); /*guarda la opcion q ADMIN selec como Correcta*/
            
            var unaRespuesta = new Respuesta(0, $( "#respCheck1" ).val()); /*107 a 114: agregamos 1 a 1 las Resp a Pregunts*/
                 unaPregunta.addRespuesta(unaRespuesta);
            unaRespuesta = new Respuesta(0, $( "#respCheck2" ).val());
                 unaPregunta.addRespuesta(unaRespuesta);
            unaRespuesta = new Respuesta(0, $( "#respCheck3" ).val());
                 unaPregunta.addRespuesta(unaRespuesta);
            unaRespuesta = new Respuesta(0, $( "#respCheck4" ).val());
                 unaPregunta.addRespuesta(unaRespuesta);
            
        }else if("seleccionMultiple" == tipoPregunta){
          $('#seleccionMultiple input:checkbox:checked').each(function(){ /*la opcionCorrecta:van a ser todos los inpts selecc y los separamos por una ","*/
            opcionCorrecta += this.value + ",";   
          });
          
          var unaRespuesta = new Respuesta(0, $( "#respMultip1" ).val()); /*122 a 129: agregamos 1 a 1 las Resp a Pregunts*/
                 unaPregunta.addRespuesta(unaRespuesta);
            unaRespuesta = new Respuesta(0, $( "#respMultip2" ).val());
                 unaPregunta.addRespuesta(unaRespuesta);
            unaRespuesta = new Respuesta(0, $( "#respMultip3" ).val());
                 unaPregunta.addRespuesta(unaRespuesta);
            unaRespuesta = new Respuesta(0, $( "#respMultip4" ).val());
                 unaPregunta.addRespuesta(unaRespuesta);
          
        }else if("respuestaCorta" == tipoPregunta){
           var unaRespuesta = new Respuesta(0, $( "#textrespuestaCorta" ).val ());
           unaPregunta.addRespuesta(unaRespuesta);
        }    
        
        unaPregunta.setOpcionCorrecta(opcionCorrecta);
        //guardar la pregunta con su tipo de respuesta en la base de datos
        guardarPregunta (unaPregunta);
        
    });
});

