const express = require('express');
const router = express.Router();
const videoGame = require('../controllers/videoGame');

router.get('/api/videogame/:idVideoGame', videoGame.getById);
router.post('/api/videogame', videoGame.create);

module.exports = router;