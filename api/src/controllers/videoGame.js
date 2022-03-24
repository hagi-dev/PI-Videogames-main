const axios = require("axios");

const { Videogame, Videogame_Genres, Genre, Op, conn } = require("../db.js");

const { APIKEY } = process.env;
process.env;

exports.getById = async (req, res) => {
  try {
    let { idVideoGame } = req.params;
    let result = await Videogame.findAll({
      where: {
        id: idVideoGame,
      },
      include: {
        model: Genre,
      },
    });

    result.length === 0
      ? await axios
          .get(`https://api.rawg.io/api/games/${idVideoGame}?key=${APIKEY}`)
          .then(response => {
            result = {
              id: response.data.id,
              name: response.data.name,
              image: response.data.background_image,
              description: response.data.description_raw,
              rating: response.data.rating,
              releaseDate: response.data.released,
              plataform: response.data.parent_platforms.map(element => {
                return element.platform.name;
              }),
              genres: response.data.genres.map(element => {
                return {
                  id: element.id,
                  name: element.name,
                };
              }),
            };
            return result;
          })
          .then(result => res.status(200).send(result))
      : res.send(result[0]);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "VideoGame not found" });
  }
};

//============================================================================

exports.create = async (req, res) => {
  const { name, description, release_date, rating, platform, genres } =
    req.body;
  console.log("este es el req.body : ", req.body);
  try {
    const options = {
      where: {
        id: {
          [Op.eq]: conn.literal("(SELECT MAX(id) FROM videogames)"),
        },
      },
    };
    const lastIdData = await Videogame.findAll(options);
    const lastId = lastIdData[0] ? lastIdData[0].toJSON().id : 0;
    const newId = lastId ? lastId + 1 : 1000000;
    await Videogame.create({
      id: newId,
      name: name,
      description: description,
      releaseDate: release_date,
      rating: rating,
      plataform: platform.map(element => {
        return element.name;
      }),
    });

    genres.forEach(async item => {
      await Videogame_Genres.create({
        videogameId: newId,
        genreId: item.id,
      });
    });
    res.json({ message: "VideoGame created" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
