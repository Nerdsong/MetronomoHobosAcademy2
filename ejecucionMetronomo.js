import { Metronomo } from "./Metronomo.js";
import {metrica1} from "./Metronomo.js";
import { GeneradorAleatorioDeNumeros } from "./generadorAleatorio.js";

const botonInicio = document.getElementById("boton_iniciar");
const botonDetener = document.getElementById("boton_detener");
const botoninstrucciones= document.getElementById("boton_instrucciones");
const selectorMetricas= document.getElementById("selector_metricas");
const barraDeslizadora = document.getElementById("barra_rango");
const BOTON_GENERAR_COMBINACION_ALEATORIA = document.getElementById("boton_numeros_aleatorios");
const BOTON_COMBINACIÓN_ALEATORIA_ANTERIOR = document.getElementById("boton_numeros_aleatorios_anterior");
const BOTON_COMBINACIÓN_ALEATORIA_SIGUIENTE = document.getElementById("boton_numeros_aleatorios_siguiente");
let bpmIngresado = document.getElementById("bpm_ingresado");
let elMetronomoEstaEnEjecucion = false

class Botones {

    inciar(element) {
        element.addEventListener('click', () => activarMetronomoInactivo());
    }
    detener(element){
        element.addEventListener('click', () => detenerMetronomoEnEjecucion())
    }

    cambiarMetrica(element){
        element.addEventListener('change', () => metrica1.muestraMetrica(metrica1.getMetricaSeleccionada()))

    }

    cambiarBPM(element){
        element.addEventListener('input', () => {
            metronomo1.setBpm(bpmIngresado.value)
            detenerMetronomo()
            activarMetronomo()
        })
    }
    
    cambiarBPMRange(element){
        element.addEventListener('input', () => {
            bpmIngresado.value = barraDeslizadora.value ;

        })
        this.cambiarBPM(element)
    }

    generarNuevaCombinacionDeNumeros(element){
        element.addEventListener ('click', () => {
                generadorAleatorio1.generarGrupoDeNumerosAleatorio(4,generadorAleatorio1.getCifraMaxima());
                document.querySelector("#numeros_aleatorios_generados").innerHTML = "" ;
                generadorAleatorio1.mostrarGrupoDeNumerosAleatorios();
                BOTON_COMBINACIÓN_ALEATORIA_SIGUIENTE.className = "btn btn-primary botones";
                BOTON_COMBINACIÓN_ALEATORIA_ANTERIOR.className = "btn btn-primary botones";
            }
        )
    }

    verCombinacionAnterior(element){
        element.addEventListener('click', () => {
        generadorAleatorio1.setIndexDelGrupoEnPantalla( (generadorAleatorio1.getIndexDelGrupoEnPantalla() - 1 )) 

        if(generadorAleatorio1.getIndexDelGrupoEnPantalla() > -1 ){
            generadorAleatorio1.mostrarGrupoDeNumerosAleatorios()
            BOTON_COMBINACIÓN_ALEATORIA_SIGUIENTE.className = "btn btn-primary botones";
            }
        else{generadorAleatorio1.setIndexDelGrupoEnPantalla(0)
             generadorAleatorio1.mostrarGrupoDeNumerosAleatorios()
             element.className = "btn btn-primary botones bg-danger";
        }
        } )
    }

    verCombinacionSiguiente(element){
        element.addEventListener('click', () => {
        generadorAleatorio1.setIndexDelGrupoEnPantalla( (generadorAleatorio1.getIndexDelGrupoEnPantalla() + 1 )) 
        
        if(generadorAleatorio1.getIndexDelGrupoEnPantalla() < (generadorAleatorio1.getTamañoDelHistorial())){
            generadorAleatorio1.mostrarGrupoDeNumerosAleatorios()
            BOTON_COMBINACIÓN_ALEATORIA_ANTERIOR.className = "btn btn-primary botones";
            }

        else{generadorAleatorio1.setIndexDelGrupoEnPantalla(generadorAleatorio1.getTamañoDelHistorial() - 1 )
             generadorAleatorio1.mostrarGrupoDeNumerosAleatorios()
             element.className = "btn btn-primary botones bg-danger"
        }

        } )
    }
}


const botones = new Botones();
botones.inciar(botonInicio);
botones.detener(botonDetener);
botones.cambiarMetrica(selectorMetricas);
botones.cambiarBPM(bpmIngresado);
botones.cambiarBPMRange(barraDeslizadora);
botones.generarNuevaCombinacionDeNumeros(BOTON_GENERAR_COMBINACION_ALEATORIA)
botones.verCombinacionAnterior(BOTON_COMBINACIÓN_ALEATORIA_ANTERIOR);
botones.verCombinacionSiguiente(BOTON_COMBINACIÓN_ALEATORIA_SIGUIENTE);



// Intanciar un nuevo metronomo.
let metronomo1 = new Metronomo (90);

let ejecutarMetronomo = "";

//Mostrar la métrica seleccionada por defecto

metrica1.muestraMetrica(metrica1.getMetricaSeleccionada())

/**
 * Es utilizada para "iniciar el metronomo" luego de "detenerlo", sin que se detenga realmente.
 */
function activarMetronomo(){
    if(document.querySelector("#bpm_ingresado").value > 0){
        if(elMetronomoEstaEnEjecucion == true){
            detenerMetronomo()
            ejecutarMetronomo = setInterval(iniciarMetronomo,metronomo1.getBpmEnMiliSegundos());}    
        else{}
    }
    else{alert("Debes escribir un número en la casilla BPM \n \nPreferiblemente mayor a 60 y menor que 250")}
}

/**
 * Es utilizada para activar el metronomo en iniciar su funcionamiento.
 */
function activarMetronomoInactivo(){
    if(document.querySelector("#bpm_ingresado").value > 0){
        elMetronomoEstaEnEjecucion = true
        detenerMetronomo()
        ejecutarMetronomo = setInterval(iniciarMetronomo,metronomo1.getBpmEnMiliSegundos());
    }
    else{alert("Debes escribir un número en la casilla BPM \n \nPreferiblemente mayor a 60 y menor que 250")}
}

/**
 * Hace que el metronomo se active
 */
function iniciarMetronomo(){
    metronomo1.inicioMetronomo()
}

/**
 * Detiene el intervalo de ejecución, es una funcion utilizada para permitir que los parametros actualizados sean tomados por el "setInterval" al detenerse e iniciarse.
 */
function detenerMetronomo(){
    clearInterval(ejecutarMetronomo);
}


/**
 * Detiene realmente el metronomo
 */
function detenerMetronomoEnEjecucion(){
    elMetronomoEstaEnEjecucion = false
    clearInterval(ejecutarMetronomo);
}


//instanciar un generador de números aleatorios. Funcionalidad que crea un ejercicio ritmico a partir de 4 numeros que en total suman 16
let generadorAleatorio1= new GeneradorAleatorioDeNumeros();
generadorAleatorio1.generarGrupoDeNumerosAleatorio(4,generadorAleatorio1.getCifraMaxima())





