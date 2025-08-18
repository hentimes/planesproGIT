// planespro/js/modules/accordion.js

export function initAccordion() {
    const accordion = document.querySelector('.benefits-accordion');
    if (!accordion) {
        return; // No hace nada si el acordeón no está en la página
    }

    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-item__header');
        
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            // Cierra todos los items antes de abrir el nuevo
            items.forEach(i => i.classList.remove('is-open'));

            // Si el item clickeado no estaba abierto, lo abre
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });
}