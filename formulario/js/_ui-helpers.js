/*
==================================================================
ARCHIVO: planespro/formulario/js/_ui-helpers.js
==================================================================
*/

// Funciones dedicadas a la manipulación de la interfaz de usuario (UI).
import { DOM } from './_dom-elements.js';

let formStepsNum = 0; // Estado local para el paso actual

export function getFormStepNum() {
    return formStepsNum;
}

export function setFormStepNum(num) {
    formStepsNum = num;
}

// --- FUNCIÓN openModal (VERSIÓN DEFINITIVA Y ROBUSTA) ---
export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // SOLUCIÓN: Revisa si el modal mismo O un elemento hijo tiene la clase 'warning-modal'.
        // Esto hace que funcione tanto para los modales originales como para los nuevos.
        if (modal.classList.contains('warning-modal') || modal.querySelector('.warning-modal')) {
            modal.classList.add('warning-modal'); // Se asegura de que el contenedor principal la tenga.
        }
        
        modal.classList.add('is-visible');
        document.body.classList.add('no-scroll');
    }
}

// --- FUNCIÓN closeModal (SIMPLIFICADA) ---
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('is-visible');

        // Solo quita el no-scroll si no queda ningún otro modal abierto.
        if (document.querySelectorAll('.modal.is-visible').length === 0) {
            document.body.classList.remove('no-scroll');
        }

        // Resetea el formulario si es el que se está cerrando.
        if (modalId === 'formModal') {
            if (DOM.leadForm) DOM.leadForm.reset();
            if (localStorage.getItem('formProgress')) localStorage.removeItem('formProgress');
            
            // Regresa al primer paso para la próxima vez que se abra.
            setFormStepNum(0);
            updateFormView();

            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            document.querySelectorAll('.error-message.visible').forEach(el => el.classList.remove('visible'));
            
            const submissionError = document.getElementById('submission-error');
            if (submissionError) submissionError.classList.remove('visible');
            
            const header = document.querySelector('#formModal .modal-header');
            if(header) header.classList.remove('scrolled');
        }
    }
}


export function updateProgressbar() {
    if (!DOM.progressSteps || !DOM.progressLine) return; 
    DOM.progressSteps.forEach((step, idx) => {
        step.classList.toggle("active", idx <= formStepsNum);
    });
    const progressPercentage = formStepsNum === 0 ? 0 : (formStepsNum / (DOM.progressSteps.length - 1)) * 100;
    DOM.progressLine.style.width = `${progressPercentage}%`;
}

export function updateFormView(direction = 'next') {
    const modalBody = document.querySelector('#formModal .modal-body'); 
    if (!DOM.formSteps || DOM.formSteps.length === 0) return; 

    DOM.formSteps.forEach(step => {
        step.classList.remove("active", "slide-in-right", "slide-in-left");
    });
    
    const currentStep = DOM.formSteps[formStepsNum];
    if (!currentStep) return;

    currentStep.classList.add("active");
    if (direction === 'next') {
        currentStep.classList.add('slide-in-right');
    } else {
        currentStep.classList.add('slide-in-left');
    }
    
    requestAnimationFrame(() => {
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
        const firstInput = currentStep.querySelector('input:not([type="hidden"]), select');
        if (firstInput) {
            firstInput.focus({ preventScroll: true });
        }
    });
    
    updateProgressbar();
}

export function showFilePreview(file) {
    const previewWrapper = document.getElementById('file-preview');
    const uploadLabel = document.querySelector('.file-upload-label');
    const errorDiv = document.getElementById('error-pdf_file');

    if (!previewWrapper || !uploadLabel || !errorDiv) return;

    errorDiv.classList.remove('visible');
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    
    previewWrapper.innerHTML = '';
    const icon = document.createElement('i');
    icon.className = 'fas fa-file-pdf';
    const text = document.createElement('span');
    text.textContent = `${file.name} (${fileSize} MB)`;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-file-btn';
    removeBtn.setAttribute('aria-label', 'Eliminar archivo');
    removeBtn.innerHTML = '&times;';
    
    removeBtn.addEventListener('click', () => {
        const pdfFileInput = document.getElementById('pdf_file');
        if (pdfFileInput) pdfFileInput.value = '';
        previewWrapper.classList.add('hidden');
        previewWrapper.innerHTML = '';
        uploadLabel.classList.remove('hidden');
    });

    previewWrapper.append(icon, text, removeBtn);
    previewWrapper.classList.remove('hidden');
    uploadLabel.classList.add('hidden');
}