const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

// Rutas para votar
router.post('/vote/topic/:id', voteController.voteTopic);
router.post('/vote/link/:id', voteController.voteLink);

module.exports = router;
