// import axios from 'axios';

export const INITIAL_PAGINATE_DATA = 'INITIAL_PAGINATE_DATA';
export const GET_PAGINATION_DATA = 'GET_PAGINATION_DATA';
export const GET_PAGE_CURRENT = 'PAGE_CURRENT';
export const RESET_PAGINATION = 'RESET_PAGINATION';

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