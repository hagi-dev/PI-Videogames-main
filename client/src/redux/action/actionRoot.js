import axios from 'axios';

export const GET_ALL_VIDEOGAMERS = 'GET_ALL_VIDEOGAMERS';
export const GET_VIDEOGAMER = 'GET_VIDEOGAMER';
export const GET_VIDEOGAMER_BY_NAME = 'GET_VIDEOGAMER_BY_NAME';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';

export const getAllVideoGames = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames')
            .then((response) => {
                dispatch({
                    type: GET_ALL_VIDEOGAMERS,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export const getVideogameById = (id)=>{
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogamer/${id}`)
            .then((response) => {
                dispatch({
                    type: GET_VIDEOGAMER,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const getVideogameByName = (name)=>{
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_VIDEOGAMER_BY_NAME,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const getAllGenres = ()=>{
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
            .then((response) => {
                dispatch({
                    type: GET_ALL_GENRES,
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

