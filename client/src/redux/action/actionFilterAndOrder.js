export const GET_FILTER_DATA = 'GET_FILTER_DATA';
export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_STATE_SELECTION = 'GET_STATE_SELECTION';
export const RESET_FILTER = 'RESET_FILTER';
export const GET_FILTER_AND_ORDER_TEXT= 'GET_FILTER_AND_ORDER_TEXT';
export const GET_FILTER = 'GET_FILTER';


export const getFilterAndOrderText = (option) => {
    return {
        type: GET_FILTER_AND_ORDER_TEXT,
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

export const resetFilter = () => {
    return {
        type: RESET_FILTER,
    }
}