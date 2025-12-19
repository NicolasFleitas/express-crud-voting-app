document.addEventListener('DOMContentLoaded', () => {
    console.log('JS listo');

    // Escucha clics en todo el documento (Delegación de eventos)
    document.addEventListener('click', async (e) => {

        // Verifica si el elemento clickeado es un botón de votar
        if (e.target.classList.contains('btn-vote')) {
            //console.log('Botón de votar clickeado');
            const button = e.target;

            // Extrae la info de los data-attributes
            const type = button.getAttribute('data-type'); // 'topic o link' 
            const id = button.getAttribute('data-id');

            // Definimos la URL a la que vamos a llamar
            const endpoint = `/api/vote/${type}/${id}`;

            try {
                // Deshabilitamos botón temporalmente para evitar doble click rápido
                button.disabled = true;
                button.innerText = "Guardando..."; // Feedback visual

                // Enviar petición al Backend (Aquí se guarda en la BD)
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();

                if (data.success) {
                    // Recargamos la página.
                    // Esto forzará al servidor a devolver la lista reordenada con los nuevos votos.
                    window.location.reload();
                } else {
                    alert('Error del servidor: ' + (data.error || 'Desconocido'));
                    button.disabled = false;
                    button.innerText = "👍 Votar";
                }

            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión');
                button.disabled = false;
                button.innerText = "👍 Votar";
            }
        }
    });
});