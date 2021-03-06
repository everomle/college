/* 
  * Representa una prueba 
 */

function Prueba (pIdPrueba, pNombre, pDescripcion, pFechaCreacion, pPuntosTotales){
    var idPrueba= pIdPrueba; 
    var nombre=pNombre;
    var descripcion=pDescripcion;
    var fechaCreacion=pFechaCreacion; 
    var puntosTotales=pPuntosTotales;
    var misPreguntas = new Array();
    
     this.getIdPrueba = function (){
        return idPrueba;
    }
    
    this.setIdPrueba = function (val){
        idPrueba = val;
    }
    
    this.getNombre = function (){
        return nombre;
    }
    
    this.setNombre = function (val){
        nombre = val;
    }
    
    this.getDescripcion = function (){
        return descripcion;
    }
    
    this.setDescripcion = function (val){
       descripcion = val;
    }
    
    this.getFechaCreacion = function (){
        return fechaCreacion;
    }
    
    this.setFechaCreacion = function (val){
       fechaCreacion = val;
    }
    
    this.getPuntosTotales = function (){
        return puntosTotales;
    }
    
    this.setPuntosTotales = function (val){
       puntosTotales = val;
    }
    
    this.getMisPreguntas = function (){
        return misPreguntas;
    }
    
    this.addPregunta = function (val){
       misPreguntas[misPreguntas.length]=val  ;
    }
}

//Agregar IDprueba y opciones correctas
function Pregunta (pIdPrueba, pIdPregunta,pTextoPreg, pTipo ,pPunto, pNivel, pOpcionCorrecta){
    var idPrueba   = pIdPrueba;
	var idPregunta = pIdPregunta;
    var textoPreg = pTextoPreg;
    var tipo= pTipo;
    var punto= pPunto; 
    var nivel= pNivel;
	var opcionCorrecta = pOpcionCorrecta;
    var misRespuestas = new Array();
    
	this.getIdPrueba = function (){
        return idPrueba;
    }
    
    this.setIdPrueba = function (val){
        idPrueba = val;
    }
	
    this.getIdPregunta = function (){
        return idPregunta;
    }
    
    this.setIdPregunta = function (val){
        idPregunta = val;
    }
    
    this.getTextoPreg = function (){
        return textoPreg;
    }
    
    this.setTextoPreg = function (val){
        textoPreg = val;
    }
    
    this.getTipo = function (){
        return tipo;
    }
    
    this.setTipo = function (val){
       tipo = val;
    }
    
    this.getPunto = function (){
        return punto;
    }
    
    this.setPunto = function (val){
       punto = val;
    }
    
    this.getNivel = function (){
        return nivel;
    }
    
    this.setNivel = function (val){
       nivel = val;
    }  

    this.getOpcionCorrecta = function (){
        return opcionCorrecta;
    }
    
    this.setOpcionCorrecta = function (val){
       opcionCorrecta = val;
    }  
    
    this.getMisRespuestas = function (){
        return misRespuestas;
    }
	
    
    this.addRespuesta = function (val){
       misRespuestas[misRespuestas.length]= val  ;
    }
}


function Respuesta (pIdRespuesta, pTexto ){
    var idRespuesta = pIdRespuesta; 
    var texto= pTexto;
            
    this.getIdRespuesta = function (){
        return idRespuesta;
    }
    
    this.setIdRespuesta = function (val){
        idRespuesta = val;
    }
    
    this.getTexto = function (){
        return texto;
    }
    
    this.setTexto = function (val){
        texto = val;
    }
}

//Esta es la clase del Usuario
function Usuario (pIdUsusario, pNombreUsusario, pPassword, pTipo){
        var sIdUsusario=pIdUsusario;
        var sNombreUsusario=pNombreUsusario;
        var sPassword=pPassword;
        var sTipo=pTipo;
         
        this.getIdUsuario=function(){
          return sIdUsusario;
        }; 
        this.setIdUsuario=function(val){
          sIdUsusario = val;
        }; 
        this.getNombreUsusario=function(){
          return sNombreUsusario;
        };
        this.getPassword=function(){
          return sPassword;
        };
        this.getTipo=function(){
          return sTipo;
        };     
};//cierra clase Ususrio

//Esta es la clase del Candidato
function Candidato(pIdUsusario, pNombreUsusario, pPassword, pTipo, pNombreCompleto,
        pCedula, pFechaNacimiento,pNivel,pDescripcion){
        Usuario.call(this, pIdUsusario, pNombreUsusario, pPassword, pTipo);
        
        var sNombreCompleto=pNombreCompleto;
        var sCedula=pCedula;
        var sFechaNacimiento=pFechaNacimiento;
        var sNivel=pNivel;
        var sDescripcion=pDescripcion;
                
        this.getNombreCompleto=function(){
          return sNombreCompleto;
        };
        this.setNombreCompleto=function(val){
            sNombreCompleto = val;
        };
        this.getCedula=function(){ 
            return sCedula;
        }; 
        this.setCedula=function(val){
            sCedula = val;
        }; 
        this.getFechaNacimiento=function(){
            return sFechaNacimiento;
        };
        this.setFechaNacimiento=function(val){
            sFechaNacimiento = val;
        };
        this.getNivel=function(){
          return sNivel;
        };  
        this.setNivel=function(val){
          sNivel = val;
        };
        this.getDescripcion=function(){
          return sDescripcion;
        };
        this.setDescripcion=function(val){
          sDescripcion = val;
        }; 
        
        this.toString = function (){
  			var miUl=document.createElement("ul");
  			var miLi1=crearLi();
  		 	miUl.className="candidato";
  		 	miLi1.appendChild(crearNodeTexto("Nombre : "+sNombreCompleto));
  			miUl.appendChild(miLi1);
  			document.getElementById("contReport").appendChild(miUl);
  		};
        
};

Candidato.prototype = new Usuario();
Candidato.prototype.constructor = Candidato;
//cierra la clase Candidato

//Clase de Registro de notas
function RegistroNota(pCandidato,pIdPrueba,pNota){
	     var sCandidato=pCandidato;
     	 var sIdPrueba=pIdPrueba;
     	 var sNota=pNota;
     	 
     	 this.getIdCandidato = function() {
              return sCandidato;
  		 };
  		 this.getIdPrueba = function() {
              return sIdPrueba;
  		 }; 
  		 this.getNota = function() {
              return sNota;
  		 };
  		 
  		 this.toString = function (){
  			var miUl=document.createElement("ul");
  			var miLi1=crearLi();
  		 	miUl.className="nota";
  		 	miLi1.appendChild(crearNodeTexto("Nota : "+sNota+"  /  "));
  			miUl.appendChild(miLi1);
  			document.getElementById("contReport").appendChild(miUl);
  		};
};//cierra clase RegistroNota

//funciones para las clases    
//Esta función crea y retorna un <li>     
function crearLi() {
    
       var miLiTemp=document.createElement("li");
       return miLiTemp;
    
}; 
     
//Esta función crea y retorna un Nodo de Texto
function crearNodeTexto(pVal) {
    
        var miTexTemp=document.createTextNode(pVal);
        return miTexTemp;
     
};   
      
//Esta función crea e imprime en contReport del html un titulo con la etiqueta <h1> 
function crearMiH1(pVal) {
    
        var mih1Temp=document.createElement("h1");
        texth1=document.createTextNode(pVal);
        mih1Temp.appendChild(texth1);
        document.getElementById("contReport").appendChild(mih1Temp);
     
};  
      
