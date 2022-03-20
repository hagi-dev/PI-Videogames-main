import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import TextField from "../../components/TextField/index";
import { getAllGenres } from "../../redux/action/actionRoot";

import "./style.scss";

const CreateVideogame = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.rootReducer.genres);
  const platforms = [
    { id: 1, name: "PC" },
    { id: 2, name: "PlayStation" },
    { id: 3, name: "Xbox" },
    { id: 4, name: "Nintendo" },
    { id: 5, name: "Android" },
  ];
  const [activeLabel, setActiveLabel] = React.useState({
    name: false,
    description: false,
    release_date: false,
    platform: false,
    genres: false,
    rating: false,
  });
  const [getData, setGetData] = React.useState({
    name: "",
    description: "",
    release_date: "",
    genres: [],
    platform: [],
    rating: "",
  });
  const [genresAndPlatforms, setGenresAndPlatforms] = React.useState({
    genres: "",
    platform: "",
  });
  const removeSelections = (id, array) => {
    setGetData(presset => {
      return {
        ...presset,
        [array]: array.filter(element => element.id !== id),
      };
    });
  };
  const handleChange = e => {
    //let {name,value} = e.target;
    console.log("entra en el selector ", e.target.name);
    setGetData({
      ...getData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelect = e => {
    setGenresAndPlatforms(() => {
      return {
        ...genresAndPlatforms,
        [e.target.name]: e.target.value,
      };
    });
    if(e.target.name === "genres"){
      setGetData({
        ...getData,
        genres: [...getData.genres, e.target.value],
      })
    }
    if(e.target.name === "platform"){
      setGetData({
        ...getData,
        platform: [...getData.platform, e.target.value],
      })
    }
  }

  const handleClick = e => {
    setActiveLabel(() => {
      return {
        ...activeLabel,
        [e.target.name]: true,
      };
    });
  };
  const handleBlur = e => {
    if (e.target.name === "release_date") {
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(getData);
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  return (
    <div className="createVideoGame">
      <div className="createVideoGame__container">
        <div className="createVideogame__title">
          <h1>Create Videogame</h1>
        </div>
        <form onSubmit={handleSubmit} className="createVideogame__form">
          <div className="rows">
            <div className="createVideogame__form__row 1">
              <TextField
                active={activeLabel.name}
                name={"name"}
                value={getData.name}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"text"}
              />
              <TextField
                active={activeLabel.release_date}
                placeholder={""}
                name={"release_date"}
                value={getData.release_date}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"date"}
              />
            </div>
            <div className="createVideogame__form__row 2">
              <TextField
                active={activeLabel.description}
                name={"description"}
                textArea={true}
                value={getData.description}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"text"}
              />
              <TextField
                active={activeLabel.genres}
                name={"genres"}
                value={genresAndPlatforms.genres}
                blurFunction={handleBlur}
                stateFunction={handleChangeSelect}
                clickFunction={handleClick}
                type={"text"}
                detail={genres}
                stateInputSelect={[]}
                removeFunction={removeSelections}
              />
            </div>
            <div className="createVideogame__form__row 3">
              <TextField
                active={activeLabel.rating}
                name={"rating"}
                value={getData.rating}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"text"}
              />
              <TextField
                active={activeLabel.platform}
                name={"platform"}
                value={genresAndPlatforms.platform}
                blurFunction={handleBlur}
                stateFunction={handleChangeSelect}
                clickFunction={handleClick}
                type={"text"}
                detail={platforms}
                stateInputSelect={[]}
                removeFunction={removeSelections}
              />
            </div>
          </div>
          <div className="createVideogame__form__button">
            <button className="button v1" type="submit">
              <span className="content-button">Save</span>
            </button>
            <button className="button v2" type="button">
              <Link to="/home" className="content-button">
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
