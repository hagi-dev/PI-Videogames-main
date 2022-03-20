const { Router } = require("express");
const { Genre } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videoGames = require("./videoGames");
const videoGame = require("./videoGame");
const genres = require("./genres");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(videoGame);
router.use(videoGames);
router.use(genres);
router.use("/prueba", async (req, res) => {
  let data = await Genre.findAll({
    attributes: ["id", "name"],
    where: {id:[1,20 , 10]}
  });
  res.send(data);
});

module.exports = router;
