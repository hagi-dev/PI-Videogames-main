const express = require('express');
const router = express.Router();
const genres = require('../controllers/genres');
//const auth = require('../middleware/auth');

router.get('/genres', genres.getAll);
module.exports = router;