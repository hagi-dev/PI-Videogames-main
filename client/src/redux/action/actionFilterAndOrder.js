import axios from 'axios';

export const GET_FILTER_CREATED_EXISTED = 'GET_FILTER_CREATED_EXISTED';
export const GET_FILTER_GENRE = 'GET_FILTER_GENRE';
export const GET_ORDER_ALPHABET_RATING = 'GET_ORDER_ALPHABET_RATING';
export const GET_ORDER_ASCENDING_DESCENDING = 'GET_ORDER_ASCENDING_DESCENDING';
export const GET_FILTER_DATA = 'GET_FILTER_DATA';
export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_STATE_SELECTION = 'GET_STATE_SELECTION';
export const GET_FILTER = 'GET_FILTER';

export const getFilterCreatedOrExisted = (option) => {
    return {
        type: GET_FILTER_CREATED_EXISTED,
        payload: option
    }
}

export const getFilterGenre = (option) => {
    return {
        type: GET_FILTER_GENRE,
        payload: option
    }
}

export const getOrderAlphabetOrRating = (option) => {
    return {
        type: GET_ORDER_ALPHABET_RATING,
        payload: option
    }
}

export const getOrderAscendingOrDescending = (option) => {
    return {
        type: GET_ORDER_ASCENDING_DESCENDING,
        payload: option
    }
}

export const getOrderData = (data) => {
    return {
        type: GET_ORDER_DATA,
        payload: data
    }
}

export const getFilterData = (option) => {
    return {
        type: GET_FILTER_DATA,
        payload: option
    }
}

export const getStateSelection = (data) =>{
    return {
        type: GET_STATE_SELECTION,
        payload: data
    }
}
export const initialFilterData = () => {
    return (dispatch)=>{
        axios.get('http://localhost:3001/videoGames')
        .then(response => {
            dispatch({type: GET_FILTER, payload: response.data.resData})
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const getPaginationCurrent = (current) => {
    return {
        type: GET_FILTER,
        payload: current
    }
}