import {
  GET_FILTER_DATA,
  GET_ORDER_DATA,
  GET_STATE_SELECTION,
  RESET_FILTER,
  GET_FILTER_AND_ORDER_TEXT,
} from "../action/actionFilterAndOrder";
import { GET_VIDEOGAMER_FILTER_BY_NAME } from "../action/actionRoot";

import { filterDate } from "../../helpers/filter";
import orderDate from "../../helpers/order";

const initialState = {
  filterData: [],
  stateTextFilterAndOrder: {
    createdOrExisted: "",
    genre: "",
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
    case GET_FILTER_AND_ORDER_TEXT:
      console.log("GET_FILTER_AND_ORDER_TEXT", action.payload);
      return {
        ...state,
        stateTextFilterAndOrder: {
          ...state.stateTextFilterAndOrder,
          [action.payload.name]: action.payload.value,
        },
      };
    case GET_VIDEOGAMER_FILTER_BY_NAME:
      return {
        ...state,
        filterData: action.payload,
      };

    case GET_FILTER_DATA:
      let dataFilter = filterDate(
        action.payload.videoGames,
        action.payload.createdOrExisted,
        action.payload.genre,
        action.payload.dbCount
      );
      return {
        ...state,
        filterData: dataFilter,
      };

    case GET_ORDER_DATA:
      let dataOrder = orderDate(
        action.payload.videoGames,
        action.payload.alphabetOrRating,
        action.payload.order
      );
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
      };
    default:
      return state;
  }
};

export default filter;
