import { 
    GET_FILTER_CREATED_EXISTED, 
    GET_FILTER_GENRE, 
    GET_ORDER_ALPHABET_RATING, 
    GET_ORDER_ASCENDING_DESCENDING, 
    GET_FILTER_DATA, 
    GET_ORDER_DATA ,
    GET_STATE_SELECTION 
} from '../action/actionFilterAndOrder';

const initialState = {
    FilterData: [],
    createdOrExisted: '',
    genre: '',
    alphabetOrRating: '',
    ascendingOrDescending: '',
    stateSelection: {
        state: false,
        name: ''
    }
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
        case GET_STATE_SELECTION:
            console.log('stateSelection reducers', action.payload)
            return{
                ...state,
                stateSelection: {
                    name: action.payload.name,
                    state: action.payload.state
                }
            }     
        default:
            return state;                   
    }
}

console.log('state', initialState);

export default filter;