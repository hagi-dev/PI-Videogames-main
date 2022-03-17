require('dotenv').config();
const axios = require('axios');
const {Videogame, Genre, Videogame_Genres,Op} = require('../db');

const {APIKEY} = process.env;

//============================================================

exports.getAll = async (req,res) => {
    let result = [];
    let responseData=[];
    const {name} = req.query;
    try {
        if(!name){
            let dataBD = await Videogame.findAll(
            {
                include: {
                    model: Genre,
                }
                }
            );
            let dataBdConvert = dataBD.map(e=>e.toJSON());
            let filterDataBd = dataBdConvert.map((element)=>{
                return {
                    id: element.id,
                    name: element.name,
                    image: element.image ? element.image : null,
                    rating: element.rating,
                    genres: element.genres && element.genres.map(e=>{
                        return {
                            id: e.id,
                            name: e.name,
                        }
                    }),
                }
            });
            //console.log('dataBD',filterDataBd.length);
            await axios.all([
            axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=1`),
            axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`),
            axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=3`),
            axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=4`),
            axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=5`)
            ])
            .then(axios.spread((res1, res2, res3, res4, res5) => {
                responseData = [...res1.data.results, ...res2.data.results, ...res3.data.results, ...res4.data.results, ...res5.data.results];
                return responseData;
            }))
            .then((data)=>{
                result = data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        image: item.background_image,
                        rating: item.rating,
                        genres: item.genres && item.genres.map((element)=>{
                            return {
                                id: element.id,
                                name: element.name,
                            }
                        })
                    }
                });
                return result;
            })
            .then((data)=>{
                //console.log('data api',data.length);
                res.status(200).json({
                    dbCount: filterDataBd.length,
                    apiCount: data.length,
                    count: data.length + filterDataBd.length,
                    resData: [...data,...filterDataBd],
                });
            });
        }
        else{
            let dataBD = await Videogame.findAll({
                include: {
                    model: Genre,
                },
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            });
            let dataBdConvertName = dataBD.map(e=>e.toJSON());
            let filterDataBd = dataBdConvertName.map((element)=>{
                return {
                    id: element.id,
                    name: element.name,
                    image: element.image ? element.image : null,
                    rating: element.rating,
                    genres: element.genres && element.genres.map(e=>{
                        return {
                            id: e.id,
                            name: e.name,
                        }
                    }),
                }
            });
            let data = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&search=${name}`);
            let dataCompletedApiBd = [...filterDataBd, ...data.data.results];
            //console.log('dataCompletedApiBd: ',dataCompletedApiBd, 'count: ',dataCompletedApiBd.length);
            if(dataCompletedApiBd.length===0){return res.status(404).json({
                message: 'not found',
            })};
            //console.log("amount: ",data.data.results.length);
            if(filterDataBd.length>15){
                result = filterDataBd.slice(0,15);
                res.status(200).json({
                    count: result.length,
                    resData: result,
                });
            }

        
            if(dataCompletedApiBd.length<15 && dataCompletedApiBd.length>0 && data.data.results.length>0){
                console.log('dataCompletedApiBd en aca 1');
                result = data.data.results.map(item =>{
                    return {
                        id: item.id,
                        name: item.slug,
                        image: item.background_image,
                        rating: item.rating,
                        genres: item.genres && item.genres.map((element)=>{
                            return {
                                id: element.id,
                                name: element.name,
                            }
                        }),
                    }
                });
                return res.status(200).json({
                    count: result.length,
                    resData: [...filterDataBd, ...result],
                });
            };
            if(filterDataBd.length>15 && data.data.results.length===0){
                console.log('dataCompletedApiBd en aca 2 ');
                result = filterDataBd.slice(0,15);
                return res.status(200).json({
                    count: result.length,
                    resData: result,
                });
            };
            if(filterDataBd>15 && data.data.results.length>15){
                console.log('dataCompletedApiBd en aca 3');
                result = filterDataBd.slice(0,15);
                return res.status(200).json({
                    count: result.length,
                    resData: result,
                });
            };
            if(filterDataBd.length<15 && data.data.results.length>15){
                console.log('dataCompletedApiBd en aca 4');
                let countDataBd= filterDataBd.length;
                for(let i = 0; i < 15-countDataBd; i++){
                    let item = data.data.results[i];
                    //console.log("item 0: ",data.data.results[0]);
                    result.push({
                        id: item.id,
                        name: item.name,
                        image: item.background_image ? item.background_image : null,
                        rating: item.rating,
                        genres: item.genres && item.genres.map((element)=>{
                            return {
                                id: element.id,
                                name: element.name,
                            }
                        })
                    });
                }

                return res.status(200).json({
                    count: result.length + filterDataBd.length,
                    resData: [...filterDataBd, ...result],
                });
                
            };
        }
    } 

    
    catch (err) {
        console.error(err);
        return res.json({
            message: 'not fount videogames',
            error: err
        });
    }
}

