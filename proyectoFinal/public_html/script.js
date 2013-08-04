/* 
 * Esta clase representa una prueba
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


function Preguntas (pIdPreguntas, pTexto, pTipo ,pPunto, pNivel){
    var idPreguntas= pIdPreguntas; 
    var texto= pTexto;
    var tipo= pTipo;
    var punto= pPunto; 
    var misRespuestas = new Array();
    
    this.getIdPreguntas = function (){
        return idPreguntas;
    }
    
    this.setIdPreguntas = function (val){
        idPreguntas = val;
    }
    
    this.getTexto = function (){
        return texto;
    }
    
    this.setTexto = function (val){
        texto = val;
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
        
    this.getMisRespuestas = function (){
        return misRespuestas;
    }
    
    this.addRespuesta = function (val){
       misRespuestas[misRespuestas.length]= val  ;
    }
}


function Respuesta (pIdRespuestas, pTexto ){
    var idRespuestas= pIdRespuestas; 
    var texto= pTexto;
            
    this.getIdRespuestas = function (){
        return idRespuestas;
    }
    
    this.setIdRespuestas = function (val){
        idRespuestas = val;
    }
    
    this.getTexto = function (){
        return texto;
    }
    
    this.setTexto = function (val){
        texto = val;
    }
}