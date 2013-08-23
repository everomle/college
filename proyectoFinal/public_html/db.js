/*-------------- Clases y metodos Globales -------------------------------------------------------*/
/*--Se usaran en el momento que se invoquen no necesitan estar dentro de la fx document ready-----*/

/*--- variables globales---*/
var myDb = null;
var plantillaPruebaContadorId = 0;
var plantillaPreguntaContadorId = 0;



/*---clase DB---*/
function DB(dbId) {

    var db = openDatabase(dbId, '1.0', 'Una base de datos', 2 * 1024 * 1024);

    this.executeUpdate = function(sql) {

        db.transaction(function(tx) {
            tx.executeSql(sql);
        });
    };

    this.executeUpdateWithParams = function(sql, paramsArray) {

        db.transaction(function(tx) {
            tx.executeSql(sql, paramsArray);
        });
    };

    this.executeQuery = function(sql, paramsArray, functionDelegate) {

        db.transaction(function(tx) {
            tx.executeSql(sql, paramsArray, function(tx, results) {

                functionDelegate(results);
            });
        });
    };
}

/*----Metodos Globales---- */
//A estas funciones le pasamos el objeto por eso utilizamos los "get" ya que las variables utilizadas para el "FORM" ya no existen en este documento
function guardarPrueba (pPrueba){ 
    myDb.executeUpdateWithParams("INSERT INTO PlantillaPrueba (id, nombre, descripcion, fecha, puntos ) VALUES (?, ?, ?, ?, ?)", 
        [pPrueba.getIdPrueba(), pPrueba.getNombre(), pPrueba.getDescripcion(), pPrueba.getFechaCreacion(), pPrueba.getPuntosTotales()]);
}
                                      
function guardarPregunta (pPregunta){ 
    
         if("respuestaCorta" == pPregunta.getTipo()){
             
             myDb.executeUpdateWithParams(
                 "INSERT INTO PlantillaPreguntas (id_prueba, id_pregunta, pregunta, tipo, puntos, nivel, resp1) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                 [pPregunta.getIdPrueba(), pPregunta.getIdPregunta(),pPregunta.getTextoPreg(),
                 pPregunta.getTipo(), pPregunta.getPunto(), pPregunta.getNivel(),
                 pPregunta.getMisRespuestas()[0].getTexto()]);  /* Aca obtenemos un array, "0" porq es una Unica respuesta, la q trae*/
        }else {
            myDb.executeUpdateWithParams(
                 "INSERT INTO PlantillaPreguntas (id_prueba, id_pregunta, pregunta, tipo, puntos, nivel, resp1, resp2, resp3, resp4, opcCorrect) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                 [pPregunta.getIdPrueba(), pPregunta.getIdPregunta(),pPregunta.getTextoPreg(),
                 pPregunta.getTipo(), pPregunta.getPunto(), pPregunta.getNivel(),
                 pPregunta.getMisRespuestas()[0].getTexto(),pPregunta.getMisRespuestas()[1].getTexto(),
				 pPregunta.getMisRespuestas()[2].getTexto(),
                 pPregunta.getMisRespuestas()[3].getTexto(), pPregunta.getOpcionCorrecta()]);  /* Aca obtenemos un array, "0" porq es una Unica respuesta, la q trae*/
        }
   
}
//Verificar dentro de la tabla si el usuario existe segun su tipo,
//linea 70: tipo "administrador"  y en la linea 77: tipo "candidato"
function verificarLogin(pUsuario, pFunctionVerSiElUsuarioExiste) {

    myDb.executeQuery("SELECT * FROM administrador where usuarioId = ? and password = ? ",
            [pUsuario.getNombreUsusario(), pUsuario.getPassword()], pFunctionVerSiElUsuarioExiste);

}

function verificarLoginCandidato(pUsuario, pFunctionVerSiElUsuarioExiste) {

    myDb.executeQuery("SELECT * FROM usuarios where usuarioId = ? and password = ? ",
            [pUsuario.getNombreUsusario(), pUsuario.getPassword()], pFunctionVerSiElUsuarioExiste);

}






function insertarCandidato(pCandidato) {

	myDb.executeUpdateWithParams(
                 "INSERT INTO usuarios (usuarioId, password, nombre, cedula, fechaNacimiento, nivelAcademico, descripcion) " +
				 "VALUES (?, ?, ?, ?, ?, ?, ?)",	 
                 [pCandidato.getIdUsuario(), pCandidato.getPassword(),pCandidato.getNombreCompleto(),
                 pCandidato.getCedula(), pCandidato.getFechaNacimiento(), pCandidato.getNivel(),
                 pCandidato.getDescripcion()]);
}




/*-------------- Inicia procesos que se ocupan cuando la pagina este cargado --------------------------*/
/*-----------------------------------------------------------------------------------------------------*/


// Handler for .ready() called.
$(document).ready(function() {

    console.info("Creando la DB");
    myDb = new DB("miBaseDeDatos");
    
    //Se crean las tablas en la base de datos
    myDb.executeUpdate("CREATE TABLE IF NOT EXISTS administrador (id int unique, usuarioId varchar(60), password varchar(120))");
    myDb.executeUpdate("CREATE TABLE IF NOT EXISTS PlantillaPrueba (id int unique, nombre varchar(60), descripcion varchar(120), fecha varchar(10), puntos varchar(6))");
    myDb.executeUpdate("CREATE TABLE IF NOT EXISTS PlantillaPreguntas (id_prueba int, id_pregunta int unique, pregunta varchar(60), tipo varchar(20),resp1 varchar(50),resp2 varchar(50),resp3 varchar(50),resp4 varchar(50),opcCorrect varchar(10), puntos varchar(10), nivel varchar(6))");
    //Tabla para "tipo: candidato"
    myDb.executeUpdate("CREATE TABLE IF NOT EXISTS usuarios (usuarioId varchar(60), password varchar(120), nombre varchar(60), cedula varchar(20) unique, fechaNacimiento varchar(20), nivelAcademico varchar(30), descripcion varchar(100))");
	
                                                                            
  //renombramos el Id de la prueba para que no inicie en 0 sino q continue como el sigte en la lista de la BDatos.
    function renombrarID (resultado){
         var length = resultado.rows.length;
        console.log("Entro a renombrar id, length: " + length);
        if (length >= 0) {

           plantillaPruebaContadorId = resultado.rows.item(0)["idMaxi"]+1;
           console.log("plantillaPruebaContadorId: " + plantillaPruebaContadorId);
        }
    }
    
    //Se le nombra un apodo al ID en la base de datos
    myDb.executeQuery("SELECT MAX(id) as idMaxi FROM PlantillaPrueba", [], renombrarID);

  // renombramos el Id de la pregunta para que no inice en0 sino q continue como el sigt en la lista de la BDatos
	function renombrarID2 (resultado){
         var length = resultado.rows.length;
        console.log("Entro a renombrar id, length: " + length);
        if (length >= 0) {

           plantillaPreguntaContadorId = resultado.rows.item(0)["idMaxi"]+1;
           console.log("plantillaPreguntaContadorId: " + plantillaPreguntaContadorId);
        }
    }
    
    //Se le nombra un apodo al ID e la base de datos
    myDb.executeQuery("SELECT MAX(id_pregunta) as idMaxi FROM PlantillaPreguntas", [], renombrarID2);  
    
//Se crea un administrador, si no existe
    function processResults(resultSet) {
        var length = resultSet.rows.length;

        if (length == 0) {
            myDb.executeUpdate("INSERT INTO administrador (id, usuarioId, password) VALUES (1, 'admin', 'admin123')");
        }
    }



//busqueme en administrador donde usuarioId sea "admin" y le paso a su vez cual funcion lo va hacer: "processResults", para yo pasarla como parametro debe de existir antes por eso esta arriba de esta linea de codigo 
    myDb.execut meQuery("SELECT * FROM administrador where usuarioId = 'admin'", [], processResults);
    
    myDb.execut meQuery("SELECT * FROM usuarios where usuarioId = 'eve'", [], processResultsCandidato);   
   


    console.info("DB Creada");
});


