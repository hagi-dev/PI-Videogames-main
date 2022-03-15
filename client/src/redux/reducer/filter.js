import { 
    GET_FILTER_CREATED_EXISTED, 
    GET_FILTER_GENRE, 
    GET_ORDER_ALPHABET_RATING, 
    GET_ORDER_ASCENDING_DESCENDING, 
    GET_FILTER_DATA, 
    GET_ORDER_DATA 
} from '../action/actionFilterAndOrder';

const initialState = {
    FilterData: [],
    createdOrExisted: '',
    genre: '',
    alphabetOrRating: '',
    ascendingOrDescending: '',
}

const filter = (state= initialState, action) => {
    switch (action.type){
        case GET_FILTER_CREATED_EXISTED:
            return{
                ...state,
                createdOrExisted: action.payload
            }
        case GET_FILTER_GENRE: 
            return{
                ...state,
                genre: action.payload
            }  
        case GET_ORDER_ALPHABET_RATING:
            return{
                ...state,
                alphabetOrRating: action.payload
            } 
        case GET_ORDER_ASCENDING_DESCENDING:
            return{
                ...state,
                ascendingOrDescending: action.payload
            }
        case GET_FILTER_DATA:
            return{
                ...state,
                FilterData: action.payload
            } 
        case GET_ORDER_DATA:
            return{
                ...state,
                FilterData: action.payload
            } 
        default:
            return state;                   
    }
}

export default filter;