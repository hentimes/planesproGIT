// ===================================
// Archivo Principal de JavaScript (Orquestador Definitivo)
// ===================================

// --- Módulos de la Página Principal ---
import { initNavigation } from './modules/navigation.js';
import { initModal } from './modules/modal.js';
import { initFlipCards } from './modules/flip-cards.js';
import { initCasosDeExitoSlider } from './modules/casosDeExito-slider.js';
import { initTestimonials } from './modules/testimonials.js';
import { initLogoFader } from './modules/logo-fader.js';
import { initPlanesSlider } from './modules/planes-slider.js';

// --- Módulos del FORMULARIO (importados selectivamente) ---
import { loadModules } from '../formulario/js/_module-loader.js';
import { setElements } from '../formulario/js/_dom-elements.js';
import {
    initModals as initFormModals,
    initStepNavigation,
    initFormEventListeners,
    initDynamicFields,
    initFormSubmission,
    loadProgress,
    handleFieldInteraction,
    updateActionButtonState
} from '../formulario/js/_form-logic.js';

/**
 * Función que inicializa toda la lógica INTERNA del formulario una vez que su HTML existe.
 */
function initializeFormApp() {
    setElements();
    initFormModals();
    initStepNavigation();
    initFormEventListeners(handleFieldInteraction);
    initDynamicFields();
    initFormSubmission();
    loadProgress();
    updateActionButtonState();
}

// --- Punto de Entrada de la Aplicación ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa los componentes de la página que NO dependen del formulario.
    //    Esto arregla el menú y los testimonios.
    initNavigation();
    initPlanesSlider();
    initFlipCards();
    initCasosDeExitoSlider();
    initTestimonials();
    initLogoFader();

    // 2. Carga el HTML del formulario desde los archivos de plantilla.
    loadModules()
        .then(() => {
            // 3. ¡CORRECCIÓN CLAVE! Ahora que el HTML del modal (#formModal) existe en la página,
            //    inicializamos el script que hace que los botones CTA lo abran.
            console.log("HTML del formulario cargado. Activando los botones de la página principal...");
            initModal(); 

            // 4. Finalmente, inicializamos toda la lógica INTERNA del formulario (pasos, validación, etc.).
            console.log("Inicializando la lógica interna del formulario...");
            initializeFormApp();
        })
        .catch(error => {
            console.error("Hubo un error crítico al cargar o inicializar el formulario:", error);
        });
});