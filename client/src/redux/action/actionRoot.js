import axios from "axios";

export const GET_ALL_VIDEOGAMERS = "GET_ALL_VIDEOGAMERS";
export const GET_VIDEOGAMER = "GET_VIDEOGAMER";
export const GET_VIDEOGAMER_BY_NAME = "GET_VIDEOGAMER_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_VIDEOGAMER_FILTER_BY_NAME = "GET_VIDEOGAMER_FILTER_BY_NAME";
export const INITIAL_PAGINATE_DATA = "INITIAL_PAGINATE_DATA";
export const RESET = "RESET";
export const GET_HEADER_TEXT = "GET_HEADER_TEXT";
export const GET_FILTER = "GET_FILTER";
export const RESET_VIDEOGAME = "RESET_VIDEOGAME";
export const GET_ERROR= "GET_ERROR";

export const getAllVideoGames = () => {
  return dispatch => {
    axios
      .get("http://15.229.7.220:3001/api/videogames")
      .then(response => {
        dispatch({
          type: GET_ERROR,
          payload: "",
        })
        dispatch({
          type: INITIAL_PAGINATE_DATA,
          payload: response.data.resData,
        });
        dispatch({
          type: GET_FILTER,
          payload: response.data.resData,
        });
        dispatch({
          type: GET_ALL_VIDEOGAMERS,
          payload: response.data,
        });

      })
      .catch(err => {
        console.log("root error",err);
        dispatch({
          type: GET_ERROR,
          payload: "Not connection internet",
        })
      });
  };
};

export const getVideogameById = id => {
  return dispatch => {
    axios
      .get(`http://15.229.7.220:3001/api/videogame/${id}`)
      .then(response => {

        dispatch({
          type: GET_ERROR,
          payload: "",
        })
        dispatch({
          type: GET_VIDEOGAMER,
          payload: response.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ERROR,
          payload: "Not connection internet",
        })
      });
  };
};

export const getVideogameByName = name => {
  return dispatch => {
    axios
      .get(`http://15.229.7.220:3001/api/videogames?name=${name}`)
      .then(response => {
        dispatch({
          type: GET_ERROR,
          payload: "",
        })
        dispatch({
          type: GET_VIDEOGAMER_BY_NAME,
          payload: response.data,
        });
        dispatch({
          type: GET_VIDEOGAMER_FILTER_BY_NAME,
          payload: response.data.resData,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ERROR,
          payload: "Not connection internet",
        })
      });
  };
};

export const getError =(data)=>{
  return dispatch => {
    dispatch({
      type: GET_ERROR,
      payload: data,
    })
  }
}

export const getAllGenres = () => {
  return dispatch => {
    axios
      .get("http://15.229.7.220:3001/api/genres")
      .then(response => {
        dispatch({
          type: GET_ALL_GENRES,
          payload: response.data.resData,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const getTextHeader = (object) => {
  return {
    type: GET_HEADER_TEXT,
    payload: object,
  };
}

export const resetVideogame = () => {
  return {
    type: RESET_VIDEOGAME,
  };
}
