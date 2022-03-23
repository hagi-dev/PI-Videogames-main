import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import TextField from "../../components/TextField/index";
import { getAllGenres } from "../../redux/action/actionRoot";
import { getStateSelection } from "../../redux/action/actionFilterAndOrder";
import Selection2 from "../../components/Selection2";
import { validationField } from "../../helpers/validationField";
import { platforms, platformsSelect } from "../../helpers/platformAndGenres";
import { messageGuide } from "../../helpers/guideCreateVideogame";

import "./style.scss";

const CreateVideogame = () => {
  const stateSelection = useSelector(
    state => state.filterAndOrder.stateSelection
  );
  const fieldValidation = validationField();
  const dispatch = useDispatch();
  const genres = useSelector(state => state.rootReducer.genres);
  const options = genres.map(genre => genre.name);
  const dataSelections = {
    platform: platforms,
    genres: genres,
  };
  const [activeLabel, setActiveLabel] = React.useState({
    name: false,
    description: false,
    release_date: true,
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

  const [error, setError] = React.useState({
    name: { state: false, message: "" },
    description: { state: false, message: "" },
    release_date: { state: false, message: "" },
    platform: { state: false, message: "" },
    genres: { state: false, message: "" },
    rating: { state: false, message: "" },
  });

  const removeSelections = (id, array) => {
    setGetData(presset => {
      let newDataSelection = getData[array].filter(item => item.id !== id);
      return {
        ...presset,
        [array]: newDataSelection,
      };
    });
  };
  const handleChange = e => {
    let { name, value } = e.target;
    let { state, message } = fieldValidation[name](value);
    console.log(name, " ", value);
    setError(() => {
      return {
        ...error,
        [name]: { state, message },
      };
    });
    setGetData({
      ...getData,
      [name]: value,
    });
  };

  const handleChangeSelect = (name, value) => {
    setActiveLabel(prevState => ({
      ...prevState,
      [name]: true,
    }));
    let dataSelection = dataSelections[name].find(
      element => element.name === value
    );
    setGetData(item => {
      return {
        ...item,
        [name]: [...item[name], { ...dataSelection }],
      };
    });
  };
  const handleClick = e => {
    setActiveLabel(() => {
      return {
        ...activeLabel,
        [e.target.name]: true,
      };
    });
  };
  const handleBlur = e => {
    let { name, value } = e.target;
    let { state, message } = fieldValidation[name](value);
    console.log(name, " ", value);
    setError(() => {
      return {
        ...error,
        [name]: { state, message },
      };
    });
    console.log(error);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(getData);
  };

  const handleClickBase = () => {
    stateSelection.state &&
      dispatch(getStateSelection({ state: false, name: "" }));
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  return (
    <div className="createVideoGame" onClick={handleClickBase}>
      {console.log(error)}
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
                require={true}
                value={getData.name}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"text"}
              >
                <p
                  className={`messageInput ${error.name.state ? "error" : ""}`}
                >
                  {error.name.state ? error.name.message : messageGuide.name}
                </p>
              </TextField>

              <TextField
                active={activeLabel.release_date}
                placeholder={""}
                name={"release_date"}
                value={getData.release_date}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"date"}
              >
                <p
                  className={`messageInput ${
                    error.release_date.state ? "error" : ""
                  }`}
                >
                  {error.release_date.state
                    ? error.release_date.message
                    : messageGuide.release_date}
                </p>
              </TextField>
            </div>
            <div className="createVideogame__form__row 2">
              <TextField
                active={activeLabel.description}
                name={"description"}
                require={true}
                textArea={true}
                value={getData.description}
                blurFunction={handleBlur}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"text"}
              >
                <p
                  className={`messageInput ${
                    error.description.state ? "error" : ""
                  }`}
                >
                  {error.description.state
                    ? error.description.message
                    : messageGuide.description}
                </p>
              </TextField>
              <div className="container_selection 1">
                <h4
                  name={"genres"}
                  className={`h4 ${
                    activeLabel.genres ? "activate" : "deactivate"
                  } `}
                >
                  Genres
                </h4>
                <Selection2
                  width={"100%"}
                  name={"genres"}
                  version={"v1"}
                  blurFunction={handleBlur}
                  functionActiva={handleChangeSelect}
                  options={options}
                >
                  <div
                    className="container_select-selection"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {getData.genres.map(genre => {
                      return (
                        <div key={genre.id} style={{ margin: "2px 3px" }}>
                          <p>
                            {genre.name}
                            <button
                              onClick={() =>
                                removeSelections(genre.id, "genres")
                              }
                            >
                              X
                            </button>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <p
                    className={`messageSelect ${
                      error.genres.state ? "error" : ""
                    }`}
                  >
                    {error.genres.state
                      ? error.genres.message
                      : messageGuide.genres}
                  </p>
                </Selection2>
              </div>
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
              >
                <p
                  className={`messageInput ${
                    error.rating.state ? "error" : ""
                  }`}
                >
                  {error.rating.state
                    ? error.rating.message
                    : messageGuide.rating}
                </p>
              </TextField>
              <div className="container_selection 2">
                <h4
                  name={"genres"}
                  className={`h4 ${
                    activeLabel.platform ? "activate" : "deactivate"
                  } `}
                >
                  Platform*
                </h4>
                <Selection2
                  width={"100%"}
                  name={"platform"}
                  version={"v1"}
                  blurFunction={handleBlur}
                  functionActiva={handleChangeSelect}
                  options={platformsSelect}
                >
                  <div className="container_select-selection">
                    {getData.platform.map(e => {
                      return (
                        <div key={e.id} style={{ margin: "2px 3px" }}>
                          <p>
                            {e.name}
                            <button
                              onClick={() => removeSelections(e.id, "platform")}
                            >
                              X
                            </button>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <p
                    className={`messageSelect ${
                      error.platform.state ? "error" : ""
                    }`}
                  >
                    {error.platform.state
                      ? error.platform.message
                      : messageGuide.platform}
                  </p>
                </Selection2>
              </div>
            </div>
          </div>
          <div className="createVideogame__form__button">
            <button className="button v1" type="submit">
              <span className="content-button">Save</span>
            </button>
            <button disable="true" className="button v2" type="button">
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
