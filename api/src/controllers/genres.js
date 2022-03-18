const axios = require('axios');

const {APIKEY} = process.env;
const {Genre} = require('../db');

exports.getAll = async (req,res) => {
    let genre = await Genre.findAll();
    // console.log(genre.length ?  'bd send' : 'api send');
    let resGenres = genre.length !== 0 ? genre :
    await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
    .then(response => {
        return response.data.results.map(item => {
            return {
                id: item.id,
                name: item.name,
            }
        });
    })
    .catch(err => console.log(err));
    
    if(genre.length === 0){
        resGenres.forEach(async (item) => {
            console.log('entro ',item);
            await Genre.create(item)
            .catch(err => res.status(500).send(err));
        });
    }

    let dataSend = resGenres.map(item => {
        return {
            id: item.id,
            name: item.name,
        }
    })

    res.status(200).json({
        count: resGenres.length,
        resData: dataSend,
    });
}
