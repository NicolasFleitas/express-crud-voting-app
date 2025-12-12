const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Definición de rutas
router.get('/', topicController.index);
router.post('/temas', topicController.store);
router.post('/temas/delete/:id', topicController.destroy);

module.exports = router