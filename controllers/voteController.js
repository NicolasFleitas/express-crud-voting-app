const Topic = require('../models/Topic')
const Link = require('../models/Link')

const voteController = {
    // Manejar voto para un TEMA
    voteTopic: (request, response) => {
        const { id } = request.params; //  Obtiene ID de la URL

        Topic.voteUp(id, (err) => {
            if (err) {
                return response.status(500).json({ sucess: false, error: "Error al votar por el tema" });
            }
            // Si funciona, enviamos éxito.
            // El frontend lee el "true" y suma el punto visualmente
            response.json({ success: true });
        });
    },

    // Manejar voto para un ENLACE
    voteLink: (request, response) => {
        const { id } = request.params; // Obtiene ID de la URL

        Link.voteUp(id, (err) => {
            if (err) {
                return response.status(500).json({ success: false, error: "Error al votar por el enlace" });
            }
            response.json({ success: true });
        });
    }
};

module.exports = voteController;