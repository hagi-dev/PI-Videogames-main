import {
    GET_PAGINATION_DATA,
    RESET_PAGINATION,
    INITIAL_PAGINATE_DATA,
    GET_PAGE_CURRENT
} from '../action/actionPagination.js';

const initialState = {
    paginationData: [],
    current: 1,
}

const paginate = (state= initialState, action) => {
    switch(action.type){
        case INITIAL_PAGINATE_DATA:
            let dataInitial = action.payload.slice(0,15);
            return {
                ...state,
                paginationData: dataInitial
            }
        case GET_PAGINATION_DATA:
            console.log('peticon paginate reducer',action.payload);
            return {
                ...state,
                paginationData: action.payload
            }
        case GET_PAGE_CURRENT:
            return {
                ...state,
                current: action.payload
            }    
        case RESET_PAGINATION:
            return {
                ...state,
                current: 1
            }
        default:
            return state;
    }
}

export default paginate;