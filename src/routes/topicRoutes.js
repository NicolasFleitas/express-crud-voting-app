const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// RUTAS DE TEMAS
router.get('/', topicController.index);
router.post('/temas', topicController.store);
router.post('/temas/delete/:id', topicController.destroy);

// RUTAS PARA ENLACES
// :id representa el ID del tema donde guardaremos el enlace
router.post('/temas/:id/enlaces', topicController.storeLink);
// :id es el ID del ENLACE que vamos a borrar
router.post('/enlaces/delete/:id', topicController.destroyLink);

module.exports = router