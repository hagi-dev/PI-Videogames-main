// import axios from 'axios';

export const INITIAL_PAGINATE_DATA = 'INITIAL_PAGINATE_DATA';
export const GET_PAGINATION_DATA = 'GET_PAGINATION_DATA';
export const GET_PAGE_CURRENT = 'PAGE_CURRENT';
export const RESET_PAGINATION = 'RESET_PAGINATION';

// export const InitialPaginationData = () => {
//     return (dispatch)=>{
//         axios.get('http://localhost:3001/videoGames')
//         .then(response => {
//             dispatch({type: INITIAL_PAGINATE_DATA, payload: response.data.resData})
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }
// }

export const  getPaginationCurrent = (current) => {
    return {
        type: GET_PAGINATION_DATA,
        payload: current
    }
}

export const getPageCurrent = (current) => {
    return {
        type: GET_PAGE_CURRENT,
        payload: current
    }
}

export const resetPagination = () => {
    return {
        type: RESET_PAGINATION,
    }
}