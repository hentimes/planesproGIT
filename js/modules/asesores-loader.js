// planespro/js/modules/asesores-loader.js

import { asesoresData } from '../../data/asesores.js';

/**
 * Crea el código HTML para el contenido del modal de un asesor.
 */
function createModalContent(asesor) {
    const especialidadesHtml = asesor.especialidades.map(item => `
        <li><i class="fas fa-check-circle"></i> ${item}</li>
    `).join('');

    const testimonioHtml = asesor.testimonio ? `
        <div class="asesor-modal__testimonio">
            <p class="asesor-modal__testimonio-cita">“${asesor.testimonio.cita}”</p>
            <p class="asesor-modal__testimonio-autor">- ${asesor.testimonio.autor}</p>
        </div>
    ` : '';

    const socialIcons = {
        linkedin: 'fab fa-linkedin-in',
        x: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        facebook: 'fab fa-facebook-f',
        tiktok: 'fab fa-tiktok'
    };
    
    let socialsHtml = '';
    if (asesor.socials) {
        const socialLinks = Object.entries(asesor.socials)
            .filter(([_, url]) => url && url.trim() !== '')
            .map(([platform, url]) => `
                <a href="${url}" target="_blank" aria-label="${platform}"><i class="${socialIcons[platform]}"></i></a>
            `).join('');
        
        if (socialLinks) {
            socialsHtml = `<div class="asesor-modal__socials">${socialLinks}</div>`;
        }
    }

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
                    ${socialsHtml}
                </div>
            </div>
            <div class="asesor-modal__footer">
                ${testimonioHtml}
                <button class="button button--primary button--large asesor-modal__cta" data-modal-trigger="formModal">
                    <i class="fas fa-search-dollar"></i> Solicitar Análisis con ${asesor.nombre.split(' ')[0]}
                </button>
            </div>
        </div>
    `;
}

/**
 * Muestra el modal con la información del asesor seleccionado.
 */
function showAsesorModal(asesorId) {
    const asesor = asesoresData.find(a => a.id === asesorId);
    if (!asesor) return;

    const modalContainer = document.createElement('div');
    modalContainer.className = 'asesor-modal';
    modalContainer.innerHTML = createModalContent(asesor);
    
    document.body.appendChild(modalContainer);
    document.body.classList.add('no-scroll');

    requestAnimationFrame(() => {
        modalContainer.classList.add('is-visible');
    });

    const closeButton = modalContainer.querySelector('.asesor-modal__close');
    closeButton.addEventListener('click', () => hideAsesorModal(modalContainer));
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            hideAsesorModal(modalContainer);
        }
    });

    const ctaFormButton = modalContainer.querySelector('.asesor-modal__cta');
    ctaFormButton.addEventListener('click', () => {
        hideAsesorModal(modalContainer);
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal) {
            welcomeModal.classList.add('is-visible');
            document.body.classList.add('no-scroll');
        }
    });
}

/**
 * Oculta y elimina el modal del DOM.
 */
function hideAsesorModal(modalContainer) {
    modalContainer.classList.remove('is-visible');
    
    modalContainer.addEventListener('transitionend', () => {
        modalContainer.remove();
        if (document.querySelectorAll('.modal.is-visible, .asesor-modal.is-visible').length === 0) {
            document.body.classList.remove('no-scroll');
        }
    }, { once: true });
}

/**
 * Crea el código HTML para una sola tarjeta de perfil de asesor en la página.
 */
function createAsesorCard(asesor) {
    const especialidadesHtml = asesor.especialidades.map(item => `
        <li><i class="fas fa-check-circle"></i> ${item}</li>
    `).join('');

    const certificacionHtml = asesor.certificacion 
        ? `<span class="asesor-card__certificacion">
               <i class="fas fa-shield-alt"></i>
               <span class="tooltip-text">Certificado por la Superintendencia de Salud</span>
           </span>`
        : '';

    const premiumRibbonHtml = asesor.premium
        ? `<div class="asesor-card__premium-ribbon">
               <i class="fas fa-star"></i>
           </div>`
        : '';
    
    // NOTA: Debes agregar la propiedad 'fortaleza' a cada objeto en tu archivo 'data/asesores.js'.
    // Ejemplo: fortaleza: { icon: 'fa-baby', text: 'Te ayudo a optimizar tu plan de maternidad' }
    const fortalezaHtml = asesor.fortaleza ? `
        <p class="asesor-card__fortaleza">
            <i class="fas ${asesor.fortaleza.icon}"></i>
            <span>${asesor.fortaleza.text}</span>
        </p>
    ` : '';

    return `
        <div class="asesor-card" data-asesor-id="${asesor.id}">
            ${premiumRibbonHtml}
            
            <div class="asesor-card__header-mobile">
                <div class="asesor-card__img-container">
                    <img src="${asesor.foto}" alt="Foto de ${asesor.nombre}" class="asesor-card__img">
                </div>
                <div class="asesor-card__title-group">
                    <h3 class="asesor-card__nombre">${asesor.nombre} ${certificacionHtml}</h3>
                    <p class="asesor-card__cargo">${asesor.cargo}</p>
                </div>
            </div>

            <div class="asesor-card__body-mobile">
                ${fortalezaHtml}
            </div>
            
            <div class="asesor-card__accordion">
                <button class="asesor-card__accordion-toggle">
                    Ver Especialidades <i class="fas fa-chevron-down"></i>
                </button>
                <div class="asesor-card__accordion-content">
                    <div class="asesor-card__especialidades">
                        <ul>${especialidadesHtml}</ul>
                    </div>
                    <button class="button button--primary asesor-card__cta">
                        <i class="fas fa-user-tie"></i> Ver Perfil Completo
                    </button>
                </div>
            </div>
        </div>
    `;
}


/**
 * Inicializa la carga de los perfiles de asesores y la lógica del carrusel/acordeón.
 */
export function initAsesores() {
    const sliderWrapper = document.querySelector('.asesores-slider-wrapper');
    if (!sliderWrapper) return;
    
    const container = sliderWrapper.querySelector('#asesores-container');
    if (!container) return;

    container.innerHTML = asesoresData.map(createAsesorCard).join('');

    container.addEventListener('click', (event) => {
        const card = event.target.closest('.asesor-card');
        if (!card) return;

        const asesorId = card.dataset.asesorId;

        if (event.target.closest('.asesor-card__accordion-toggle')) {
            card.classList.toggle('is-open');
        }

        if (event.target.closest('.asesor-card__cta')) {
            showAsesorModal(asesorId);
        }
    });

    const setupDesktopCarousel = () => {
        const prevButton = sliderWrapper.querySelector('.slider-arrow.prev');
        const nextButton = sliderWrapper.querySelector('.slider-arrow.next');
        const dotsContainer = document.querySelector('.asesores-slider-controls .slider-dots');

        if (!prevButton || !nextButton || !dotsContainer) return;

        dotsContainer.innerHTML = asesoresData.map((_, index) => `<button class="slider-dot" data-index="${index}"></button>`).join('');
        
        const cards = container.querySelectorAll('.asesor-card');
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        if (cards.length === 0) return;

        const scrollAmount = cards[0].offsetWidth + parseInt(window.getComputedStyle(container).gap, 10);
        
        const updateSliderUI = () => {
            const currentIndex = Math.round(container.scrollLeft / scrollAmount);
            dots.forEach((dot, index) => dot.classList.toggle('is-active', index === currentIndex));
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= cards.length - 1;
        };

        nextButton.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                container.scrollTo({ left: index * scrollAmount, behavior: 'smooth' });
            });
        });

        let scrollTimeout;
        container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateSliderUI, 150);
        });

        updateSliderUI();
    };

    const handleView = () => {
        if (window.innerWidth >= 768) {
            container.classList.remove('mobile-view');
            if (!container.dataset.desktopInit) {
                setupDesktopCarousel();
                container.dataset.desktopInit = 'true';
            }
        } else {
            container.classList.add('mobile-view');
        }
    };
    
    window.addEventListener('resize', handleView);
    handleView();
}