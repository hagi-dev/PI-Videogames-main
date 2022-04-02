import { useDispatch } from "react-redux";

import {
  GET_ALL_VIDEOGAMERS,
  GET_VIDEOGAMER,
  GET_VIDEOGAMER_BY_NAME,
  GET_ALL_GENRES,
  GET_HEADER_TEXT,
  RESET,
  RESET_VIDEOGAME,
  GET_ERROR
} from "../action/actionRoot";

const initialState = {
  videoGames: [],
  videoGame: {},
  genres: [],
  header: {
    text: "",
    title: "Home",
  },
  error:{
    
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMERS:
      return {
        ...state,
        videoGames: action.payload,
      };
    case GET_VIDEOGAMER:
      return {
        ...state,
        videoGame: action.payload,
      };
    case GET_VIDEOGAMER_BY_NAME:
      return {
        ...state,
        videoGames: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_HEADER_TEXT:
      return {
        ...state,
        header: {
          ...state.header,
          [action.payload.name]: action.payload.value,
        },
      };
    case RESET_VIDEOGAME:
      return {
        ...state,
        videoGame: {},
      };
    case RESET:
      return {
        ...state,
        videoGames: [],
      };
    case GET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          message: action.payload
        }
      }
    default:
      return state;
  }
};

export default rootReducer;
