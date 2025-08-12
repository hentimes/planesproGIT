// Carga los módulos HTML de forma asíncrona.

export async function loadModules() {
    // CORRECCIÓN: Las rutas ahora apuntan correctamente desde la raíz del proyecto.
    const modulePaths = {
        'form-modal-placeholder': 'formulario/templates/_form-modal.html',
        'isapre-warning-modal-placeholder': 'formulario/templates/_warning-isapre.html',
        'exit-confirm-modal-placeholder': 'formulario/templates/_warning-exit.html'
    };

    const modulePromises = Object.entries(modulePaths).map(async ([placeholderId, path]) => {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status} en ${path}`);
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                // Reemplazamos el placeholder con el contenido cargado
                placeholder.outerHTML = html;
            } else {
                console.warn(`El placeholder con id "${placeholderId}" no fue encontrado.`);
            }
        } catch (error) {
            console.error(`Error al cargar el módulo desde "${path}":`, error);
            throw error;
        }
    });

    try {
        await Promise.all(modulePromises);
        console.log("Módulos del formulario cargados correctamente.");
    } catch (error) {
        document.body.innerHTML = '<p style="color: black; text-align: center; padding: 2rem;">Error crítico al cargar los componentes del formulario. Por favor, recargue la página.</p>';
        throw new Error("La carga de módulos del formulario falló.");
    }
}