export const GET_FILTER_CREATED_EXISTED = 'GET_FILTER_CREATED_EXISTED';
export const GET_FILTER_GENRE = 'GET_FILTER_GENRE';
export const GET_ORDER_ALPHABET_RATING = 'GET_ORDER_ALPHABET_RATING';
export const GET_ORDER_ASCENDING_DESCENDING = 'GET_ORDER_ASCENDING_DESCENDING';
export const GET_FILTER_DATA = 'GET_FILTER_DATA';
export const GET_ORDER_DATA = 'GET_ORDER_DATA';

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

export const getFilterData = (data) => {
    return {
        type: GET_FILTER_DATA,
        payload: data
    }
}

export const getOrderData = (data) => {
    return {
        type: GET_ORDER_DATA,
        payload: data
    }
}