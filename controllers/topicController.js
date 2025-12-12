const Topic = require('../models/Topic');
const Link = require('../models/Link');
const { response } = require('express');

const topicController = {
    // GET / - Mostrar todo
    index: (request, response) => {
        // 1. Obtiene todos los temas de la base de datos
        Topic.getAll((err, topics) => {
            if (err) return response.status(500).send("Error al obtener temas");

            // 2. Obtiene todos los enlaces de la base de datos
            Link.getAll((err, links) => {
                if (err) return response.status(500).send("Error al obtener enlaces");

                // 3. Une los enlaces con sus temas correspondientes
                topics.forEach(topic => {
                    topic.links = links.filter(link => link.topic_id === topic.id);
                });

                // 4. Renderiza la vista con los temas y sus enlaces
                response.render('index', { topics: topics });
            });
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
            if (err) return response.status(500).send("Error al eliminar el tema");
            response.redirect('/');
        });
    },

    // FUNCIONALIDAD PARA ENLACES
    // POST /temas/:id/enlaces 
    storeLink: (request, response) => {
        const { id } = request.params; // El ID del tema viene en la URL
        const { title, url } = request.body; // El título y URL vienen del formulario

        Link.create(id, title, url, (err) => {
            if (err) return response.status(500).send("Error al crear link");
            response.redirect('/') // Recargamos la página para ver el nuevo link
        });

    },

    // POST /enlaces/delete/:id - Eliminar un enlace
    destroyLink: (request, response) => {
        const { id } = request.params; // El ID del link
        Link.delete(id, (err) => {
            if (err) return response.status(500).send("Error al eliminar link");
            response.redirect('/');
        });
    }
};

module.exports = topicController;
