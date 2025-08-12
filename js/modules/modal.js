// ===================================
// Módulo para la Funcionalidad de la Ventana Modal
// ===================================

export function initModal() {
    
    // --- Selección de Elementos del DOM ---
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const formModalNode = document.getElementById('formModal');

    // Si no hay disparadores o modal en la página, no continuamos.
    if (modalTriggers.length === 0 || !formModalNode) {
        return;
    }

    // --- Función para abrir el modal ---
    const openModal = () => {
        formModalNode.classList.add('is-visible');
        document.body.classList.add('no-scroll');
    };

    // --- Función para cerrar el modal ---
    const closeModal = () => {
        formModalNode.classList.remove('is-visible');
        document.body.classList.remove('no-scroll');
    };

    // --- Asignación de Eventos a los disparadores ---
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Verificamos si el modal está visible para decidir si abrir o cerrar.
            // Esto permite que el mismo botón pueda abrir y cerrar el modal.
            if (formModalNode.classList.contains('is-visible')) {
                closeModal();
            } else {
                openModal();
            }
        });
    });

    // Cerrar el modal haciendo clic en el overlay (el fondo oscuro)
    const overlay = formModalNode.querySelector('.modal__overlay');
    if(overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Cerrar el modal presionando la tecla 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && formModalNode.classList.contains('is-visible')) {
            closeModal();
        }
    });
}