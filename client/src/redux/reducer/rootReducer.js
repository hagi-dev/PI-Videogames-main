import { useDispatch} from 'react-redux';

import { 
    GET_ALL_VIDEOGAMERS, 
    GET_VIDEOGAMER, 
    GET_VIDEOGAMER_BY_NAME, 
    GET_ALL_GENRES,
} from '../action/actionRoot';

const initialState = {
    videoGames: [],
    videoGame: {},
    genres: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VIDEOGAMERS:
            return {
                ...state,
                videoGames: action.payload
            }
        case GET_VIDEOGAMER:
            return {
                ...state,
                videoGame: action.payload
            }
        case GET_VIDEOGAMER_BY_NAME:
            return {
                ...state,
                videoGames: action.payload
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }                
        default:
            return state;
    }
}

export default rootReducer;