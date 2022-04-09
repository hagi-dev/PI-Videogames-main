const express = require('express');
const router = express.Router();
const genres = require('../controllers/genres');
//const auth = require('../middleware/auth');

router.get('/api/genres', genres.getAll);
module.exports = router;