const express = require('express');
const router = express.Router();
const videoGame = require('../controllers/videoGame');

router.get('/videogame/:idVideoGame', videoGame.getById);
router.post('/videogame', videoGame.create);

module.exports = router;