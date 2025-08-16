// planespro/js/modules/asesores-loader.js

import { asesoresData } from '../../data/asesores.js';

/**
 * Crea el código HTML para el contenido del modal de un asesor.
 * @param {object} asesor - El objeto con los datos de un asesor.
 * @returns {string} El código HTML para el interior del modal.
 */
function createModalContent(asesor) {
    const especialidadesHtml = asesor.especialidades.map(item => `
        <li><i class="fas fa-check-circle"></i> ${item}</li>
    `).join('');

    const testimonioHtml = asesor.testimonio ? `
        <div class="asesor-modal__testimonio">
            <i class="fas fa-quote-left"></i>
            <p class="asesor-modal__testimonio-cita">“${asesor.testimonio.cita}”</p>
            <p class="asesor-modal__testimonio-autor">- ${asesor.testimonio.autor}</p>
        </div>
    ` : '';

    return `
        <div class="asesor-modal__content">
            <button class="asesor-modal__close">&times;</button>
            <div class="asesor-modal__grid">
                <div class="asesor-modal__media">
                    <img src="${asesor.foto}" alt="Foto de ${asesor.nombre}" class="asesor-modal__img">
                </div>
                <div class="asesor-modal__info">
                    <h2 class="asesor-modal__nombre">${asesor.nombre}</h2>
                    <p class="asesor-modal__cargo">${asesor.cargo}</p>
                    <p class="asesor-modal__bio">${asesor.biografia}</p>
                    <h4 class="asesor-modal__subtitle">Especialidades Clave:</h4>
                    <ul class="asesor-modal__especialidades">
                        ${especialidadesHtml}
                    </ul>
                </div>
                <div class="asesor-modal__footer">
                    ${testimonioHtml}
                    <button class="button button--primary button--large asesor-modal__cta" data-modal-trigger="formModal">
                        <i class="fas fa-search-dollar"></i> Solicitar Análisis con ${asesor.nombre.split(' ')[0]}
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Muestra el modal con la información del asesor seleccionado.
 * @param {string} asesorId - El ID del asesor a mostrar.
 */
function showAsesorModal(asesorId) {
    const asesor = asesoresData.find(a => a.id === asesorId);
    if (!asesor) return;

    const modalContainer = document.createElement('div');
    modalContainer.className = 'asesor-modal';
    modalContainer.innerHTML = createModalContent(asesor);
    
    document.body.appendChild(modalContainer);
    document.body.classList.add('no-scroll');

    // Forzar el repintado para que la animación funcione
    requestAnimationFrame(() => {
        modalContainer.classList.add('is-visible');
    });

    // Eventos para cerrar el modal
    const closeButton = modalContainer.querySelector('.asesor-modal__close');
    closeButton.addEventListener('click', () => hideAsesorModal(modalContainer));
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            hideAsesorModal(modalContainer);
        }
    });
}

/**
 * Oculta y elimina el modal del DOM.
 * @param {HTMLElement} modalContainer - El elemento del modal a ocultar.
 */
function hideAsesorModal(modalContainer) {
    modalContainer.classList.remove('is-visible');
    
    // Espera a que termine la animación de salida para eliminar el elemento
    modalContainer.addEventListener('transitionend', () => {
        modalContainer.remove();
        // Solo quita el no-scroll si no hay otros modales abiertos
        if (document.querySelectorAll('.modal.is-visible, .asesor-modal.is-visible').length === 0) {
            document.body.classList.remove('no-scroll');
        }
    }, { once: true });
}


/**
 * Crea el código HTML para una sola tarjeta de perfil de asesor en la página.
 * @param {object} asesor - El objeto con los datos de un asesor.
 * @returns {string} El código HTML de la tarjeta.
 */
function createAsesorCard(asesor) {
    const especialidadesHtml = asesor.especialidades.slice(0, 3).map(item => `
        <li><i class="fas fa-check-circle"></i> ${item}</li>
    `).join('');

    const certificacionHtml = asesor.certificacion 
        ? '<div class="asesor-card__certificacion"><i class="fas fa-shield-alt"></i> Certificado</div>' 
        : '';

    return `
        <div class="asesor-card">
            <div class="asesor-card__media">
                <img src="${asesor.foto}" alt="Foto de ${asesor.nombre}" class="asesor-card__img">
            </div>
            <div class="asesor-card__info">
                <div class="asesor-card__header">
                    <h3 class="asesor-card__nombre">${asesor.nombre}</h3>
                    ${certificacionHtml}
                </div>
                <p class="asesor-card__cargo">${asesor.cargo}</p>
                <div class="asesor-card__especialidades">
                    <h4>Principales Especialidades</h4>
                    <ul>${especialidadesHtml}</ul>
                </div>
                <button class="button button--primary asesor-card__cta" data-asesor-id="${asesor.id}">
                    <i class="fas fa-user-tie"></i> Ver Perfil Completo
                </button>
            </div>
        </div>
    `;
}

/**
 * Inicializa la carga de los perfiles de asesores y añade los event listeners.
 */
export function initAsesores() {
    const container = document.getElementById('asesores-container');

    if (!container) return; // Si no estamos en la página de asesores, no hace nada.

    container.innerHTML = asesoresData.map(createAsesorCard).join('');
    
    // Añade un único event listener al contenedor para manejar los clics en los botones
    container.addEventListener('click', (event) => {
        const ctaButton = event.target.closest('.asesor-card__cta');
        if (ctaButton) {
            const asesorId = ctaButton.dataset.asesorId;
            showAsesorModal(asesorId);
        }
    });
}