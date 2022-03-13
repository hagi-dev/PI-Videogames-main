const express = require('express');
const router = express.Router();
const videoGames = require('../controllers/videoGames');

router.get('/videogames', videoGames.getAll);

module.exports = router;