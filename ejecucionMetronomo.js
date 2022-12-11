import { Metronomo } from "./Metronomo.js";
import {metrica1} from "./Metronomo.js";

const botonInicio = document.getElementById("boton_iniciar");
const botonDetener = document.getElementById("boton_detener");
const seleccionadorMetrica = document.getElementById("selector_metricas");
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
        element.addEventListener('change', () => {
            metronomo1.setBpm(bpmIngresado.value)
            detenerMetronomo()
            activarMetronomo()
        })
    }
}


const botones = new Botones();
botones.inciar(botonInicio);
botones.detener(botonDetener);
botones.cambiarMetrica(seleccionadorMetrica);
botones.cambiarBPM(bpmIngresado);

// Intanciar un nuevo metronomo.
let metronomo1 = new Metronomo (90);

let ejecutarMetronomo = "";

/**
 * Es utilizada para "iniciar el metronomo" luego de "detenerlo", sin que se detenga realmente.
 */
function activarMetronomo(){
    if(elMetronomoEstaEnEjecucion == true){
        detenerMetronomo()
        ejecutarMetronomo = setInterval(iniciarMetronomo,metronomo1.getBpmEnMiliSegundos());}
    else{}
}s

/**
 * Es utilizada para activar el metronomo en iniciar su funcionamiento.
 */
function activarMetronomoInactivo(){
    elMetronomoEstaEnEjecucion = true
    detenerMetronomo()
    ejecutarMetronomo = setInterval(iniciarMetronomo,metronomo1.getBpmEnMiliSegundos());
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





