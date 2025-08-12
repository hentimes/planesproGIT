// Funciones dedicadas a la manipulación de la interfaz de usuario (UI).
import { DOM } from './_dom-elements.js';

let formStepsNum = 0; // Estado local para el paso actual
let currentSelectTarget = null; // Guardará la referencia al select que estamos manejando

export function getFormStepNum() {
    return formStepsNum;
}

export function setFormStepNum(num) {
    formStepsNum = num;
}

// --- INICIO: NUEVAS FUNCIONES PARA EL MODAL DE SELECCIÓN ---

/**
 * Abre el modal de selección y lo puebla con las opciones de un <select> específico.
 * @param {HTMLSelectElement} selectElement - El elemento <select> del cual tomar las opciones.
 */
export function openSelectionModal(selectElement) {
    currentSelectTarget = selectElement; // Guardamos el select original
    const modal = document.getElementById('selectionModal');
    const modalTitle = document.getElementById('selectionModalTitle');
    const list = document.getElementById('selectionModalList');
    
    if (!modal || !list || !currentSelectTarget) return;

    // 1. Limpiamos la lista anterior y establecemos el título
    list.innerHTML = '';
    const label = document.querySelector(`label[for="${selectElement.id}"]`);
    modalTitle.textContent = label ? label.textContent.replace(' *', '') : 'Seleccionar';

    // 2. Poblamos la lista con las opciones del select original
    Array.from(selectElement.options).forEach(option => {
        // Ignoramos las opciones deshabilitadas (ej. "Seleccionar")
        if (option.disabled) return;

        const listItem = document.createElement('li');
        listItem.className = 'selection-modal__item';
        listItem.textContent = option.textContent;
        listItem.dataset.value = option.value;
        list.appendChild(listItem);
    });

    // 3. Mostramos el modal
    modal.classList.add('is-visible');
    document.body.classList.add('no-scroll');
}

/**
 * Cierra el modal de selección.
 */
export function closeSelectionModal() {
    const modal = document.getElementById('selectionModal');
    if (modal) {
        modal.classList.remove('is-visible');
    }
    // No removemos no-scroll aquí, por si el modal principal sigue abierto.
    // La función closeModal principal se encargará de eso.
}

/**
 * Actualiza el texto del input falso que el usuario ve en móvil.
 * @param {HTMLSelectElement} selectElement - El select original que tiene el valor.
 */
export function updateMobileSelectTrigger(selectElement) {
    const triggerInput = document.querySelector(`.mobile-select-trigger[data-target-select="${selectElement.id}"]`);
    if (triggerInput) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        if (selectedOption && !selectedOption.disabled) {
            triggerInput.value = selectedOption.textContent;
        } else {
            triggerInput.value = ''; // Limpia si no hay nada seleccionado
        }
    }
}

// --- FIN: NUEVAS FUNCIONES ---


export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.add('is-visible');
    document.body.classList.add('no-scroll'); // Añadido para consistencia
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('is-visible');
        
        // MODIFICADO: También cierra el modal de selección si está abierto
        closeSelectionModal();

        // Solo quita no-scroll si se está cerrando el último modal visible
        if (!document.querySelector('.modal.is-visible')) {
            document.body.classList.remove('no-scroll');
        }

        if (modalId === 'formModal') {
            document.getElementById('welcome-step').classList.remove('hidden');
            document.getElementById('main-form-container').classList.add('hidden');
            document.getElementById('thank-you-step').classList.add('hidden');
            DOM.leadForm.reset();
            localStorage.removeItem('formProgress'); // Usar la constante si se importa
            DOM.consentCheckbox.checked = false;
            DOM.continueBtn.disabled = true;
            formStepsNum = 0;
            updateFormView();
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            document.querySelectorAll('.error-message.visible').forEach(el => el.classList.remove('visible'));
            
            // Actualiza todos los triggers de select en el reseteo
            document.querySelectorAll('.mobile-select-trigger').forEach(trigger => trigger.value = '');

            const submissionError = document.getElementById('submission-error');
            if (submissionError) submissionError.classList.remove('visible');
            const header = document.querySelector('.modal-header');
            if(header) header.classList.remove('scrolled');
        }
    }
}

export function updateProgressbar() {
    DOM.progressSteps.forEach((step, idx) => {
        step.classList.toggle("active", idx <= formStepsNum);
    });
    const progressPercentage = formStepsNum === 0 ? 0 : (formStepsNum / (DOM.progressSteps.length - 1)) * 100;
    DOM.progressLine.style.width = `${progressPercentage}%`;
}

export function updateFormView(direction = 'next') {
    DOM.formSteps.forEach(step => {
        step.classList.remove("active", "slide-in-right", "slide-in-left");
    });
    
    const currentStep = DOM.formSteps[formStepsNum];
    currentStep.classList.add("active");
    if (direction === 'next') {
        currentStep.classList.add('slide-in-right');
    } else {
        currentStep.classList.add('slide-in-left');
    }
    
    currentStep.querySelector("input, select")?.focus();
    updateProgressbar();
    // La actualización del botón se deja en la lógica principal
}

export function showFilePreview(file) {
    const previewWrapper = document.getElementById('file-preview');
    const uploadLabel = document.querySelector('.file-upload-label');
    const errorDiv = document.getElementById('error-pdf_file');

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
        document.getElementById('pdf_file').value = '';
        previewWrapper.classList.add('hidden');
        previewWrapper.innerHTML = '';
        uploadLabel.classList.remove('hidden');
    });

    previewWrapper.append(icon, text, removeBtn);
    previewWrapper.classList.remove('hidden');
    uploadLabel.classList.add('hidden');
}

/**
 * Obtiene la referencia al <select> original que está siendo manejado por el modal.
 * @returns {HTMLSelectElement | null}
 */
export function getCurrentSelectTarget() {
    return currentSelectTarget;
}