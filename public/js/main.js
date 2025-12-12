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

                // Llamada Fetch(AJAX)
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();

                if (data.success) {
                    // Si todo salio bien, actualiza el número en pantalla
                    // Construimos el ID del span que queremos buscar: 'votes-topic-5' o 'votes-link-3'
                    const spanId = `votes-${type}-${id}`;
                    const counterSpan = document.getElementById(spanId);

                    if (counterSpan) {
                        // Lee el número actual, y lo convierte a entero, sumamos 
                        let currentVotes = parseInt(counterSpan.innerText);
                        counterSpan.innerText = currentVotes + 1;

                        // Efecto visual: parpadeo verde
                        counterSpan.style.color = 'green';
                        setTimeout(() => counterSpan.style.color = '', 500);
                    }
                } else {
                    alert('Hubo un error al registrar tu voto');
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo conectar con el servidor');
            } finally {
                // Rehabilitar botón
                button.disabled = false;
            }
        }
    });
});