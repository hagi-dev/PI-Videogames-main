import {
  GET_FILTER_CREATED_EXISTED,
  GET_FILTER_GENRE,
  GET_ORDER_ALPHABET_RATING,
  GET_ORDER_ASCENDING_DESCENDING,
  GET_FILTER_DATA,
  GET_ORDER_DATA,
  GET_STATE_SELECTION,
  GET_FILTER,
  RESET_FILTER
} from "../action/actionFilterAndOrder";
import { GET_VIDEOGAMER_FILTER_BY_NAME } from "../action/actionRoot";

import { filterDate } from "../../helpers/filter";
import orderDate from "../../helpers/order";

const initialState = {
  filterData: [],
  stateFilter: {
    createdOrExisted: "",
    genre: "",
  },
  stateOrder: {
    alphabetOrRating: "",
    order: "",
  },
  stateSelection: {
    state: false,
    name: "",
  },
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTER:
      return {
        ...state,
        filterData: action.payload,
      };
    case GET_FILTER_CREATED_EXISTED:
      return {
        ...state,
        stateFilter: {
          ...state.stateFilter,
          createdOrExisted: action.payload,
        },
      };
    case GET_FILTER_GENRE:
      return {
        ...state,
        stateFilter: {
          ...state.stateFilter,
          genre: action.payload,
        },
      };
    case GET_VIDEOGAMER_FILTER_BY_NAME:
      return {
        ...state,
        filterData: action.payload,
      };
    case GET_ORDER_ALPHABET_RATING:
      return {
        ...state,
        stateOrder: {
          ...state.stateOrder,
          alphabetOrRating: action.payload,
        },
      };
    case GET_ORDER_ASCENDING_DESCENDING:
      return {
        ...state,
        stateOrder: {
          ...state.stateOrder,
          order: action.payload,
        },
      };
    case GET_FILTER_DATA:
      let dataFilter = filterDate(
        action.payload.videoGames,
        action.payload.createdOrExisted,
        action.payload.genre,
        action.payload.apiCount
      );
      return {
        ...state,
        filterData: dataFilter,
      };

    case GET_ORDER_DATA:
        console.log("ingresa get reducer order",action.payload)
      let dataOrder = orderDate(
        action.payload.videoGames,
        action.payload.alphabetOrRating,
        action.payload.order
      );
      console.log("retorna get reducer order",dataOrder)
      return {
        ...state,
        filterData: dataOrder,
      };

    case GET_STATE_SELECTION:
      return {
        ...state,
        stateSelection: {
          name: action.payload.name,
          state: action.payload.state,
        },
      };
    case RESET_FILTER:
        return {
            ...state,
            stateSelection: {
                name: "",
                state: false,
            },
            filterData: [],
        } 
    default:
      return state;
  }
};

export default filter;
