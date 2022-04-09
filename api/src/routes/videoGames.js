const express = require('express');
const router = express.Router();
const videoGames = require('../controllers/videoGames');

router.get('/api/videogames', videoGames.getAll);

module.exports = router;