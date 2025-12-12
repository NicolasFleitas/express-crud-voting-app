const Topic = require('../models/Topic');

const topicController = {
    // GET / - Mostrar listas de temas
    index: (request, response) => {
        Topic.getAll((err, topics) => {
            if (err) {
                return response.status(500).send("Error al obtener temas");
            }
            // Renderizamos la vista 'index' y le pasamos los datos 'topics'
            response.render('index', { topics: topics });
        });
    },

    // POST /temas - Crear tema
    store: (request, response) => {
        const { title } = request.body;
        // Validación
        if (!title || title.trim() === '') {
            return response.redirect('/')
        }
        Topic.create(title, (err) => {
            if (err) {
                return response.status(500).send("Error al crear tema");
            }
            response.redirect('/');
        });
    },

    // POST /temas/delete/:id - Eliminar tema
    destroy: (request, response) => {
        const { id } = request.params;
        Topic.delete(id, (err) => {
            if (err) {
                return response.status(500).send("Error al eliminar el tema");
            }
        });
        response.redirect('/');
    }
};

module.exports = topicController;
