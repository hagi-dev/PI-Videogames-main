require("dotenv").config();
const axios = require("axios");

const { Videogame, Genre, Videogame_Genres, Op } = require("../db");
const { APIKEY } = process.env;
const { formatObjetHome } = require("../utils/fotmatObjetHome");

//============================================================

exports.getAll = async (req, res) => {
  let result = [];
  const { name } = req.query;
  let countData = 100;
  console.log("biene name ", name);
  try {
    const options = name ? { name: { [Op.like]: `%${name}%` } } : {};
    let dataBD = await Videogame.findAll({
      include: {
        model: Genre,
      },
      where: options,
    });
    let filterDataBd = dataBD.map(element => {
      element = element.toJSON();
      return formatObjetHome(element);
    });
    /////////////////////////////////////////////////////////////////////////////////////////////
      // req all
    if (!name) {
      const requireData = async (page = 1, dataRes = []) => {
        let data1 = await axios.get(
          `https://api.rawg.io/api/games?key=${APIKEY}&page=${page}`
        );
        dataRes = [...dataRes, ...data1.data.results];
        if (dataRes.length >= countData) {
          return dataRes;
        }
        page++;
        return requireData(page, dataRes);
      };
      const DataApi = await requireData();
      const formatDataApi = DataApi.map(element => {
        return formatObjetHome(element);
      });

      res.status(200).json({
        dbCount: filterDataBd.length,
        apiCount: formatDataApi.length,
        count: formatDataApi.length + filterDataBd.length,
        resData: [...formatDataApi, ...filterDataBd],
      });

      /////////////////////////////////////////////////////////////////////////////////////////////
      // search for name
    } else {
      let data = await axios.get(
        `https://api.rawg.io/api/games?key=${APIKEY}&search=${name}`
      );
      let apiData1 = data.data.results.map(element => {
        return formatObjetHome(element);
      });
      let dataCompletedApiBd = [...filterDataBd, ...apiData1];
      if (dataCompletedApiBd.length > 15) {
        result = dataCompletedApiBd.slice(0, 15);
        return res.status(200).json({
          apiCount: apiData1.length,
          count: apiData1.length + filterDataBd.length,
          resData: [...result],
        });
      }
      res.status(200).json({
        apiCount: apiData1.length,
        count: apiData1.length + filterDataBd.length,
        resData: [...dataCompletedApiBd],
      });
    }
  } catch (err) {
    console.error(err);
    return res.json({
      message: "not fount videogames",
      error: err,
    });
  }
};
