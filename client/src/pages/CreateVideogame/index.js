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
import { methodsPost } from "../../services/post";

import "./style.scss";

const CreateVideogame = () => {
  const fieldValidation = validationField();
  const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
  const dispatch = useDispatch();
  const genres = useSelector(state => state.rootReducer.genres);
  const options = genres.map(genre => genre.name);
  const [stateButton, setStateButton] = React.useState("disabled");
  const [stateTextSelection, setStateTextSelection] = React.useState({
    genres: "",
    platform: "",
  });
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
    console.log("este es el valor cambiante", getData);
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
    let dataSelection = dataSelections[name].find(element => element.name === value);
    let exited = getData[name].find(element => element.id === dataSelection.id);
    setStateTextSelection((prevState)=>{
      return {
        ...prevState,
        [name]: value
      }
    });  
    !exited &&
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
    setError(() => {
      return {
        ...error,
        [name]: { state, message },
      };
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    let response = fieldValidation.submitValidateGame(error);
    if (response.state) {
      alert(response.message);
    }else{
      alert('paso y se registro')
    }

    

    // let response = await methodsPost(getData);
    // alert(response.data.message);
  };

  const handleClickBase = () => {
    stateSelection.state && dispatch(getStateSelection({ state: false, name: "" }));
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  useEffect(() => {
    console.log('useEffec getdata',getData);
    if (
      !fieldValidation.name(getData.name).state &&
      !fieldValidation.description(getData.description).state &&
      getData.platform.length
    ) {
      setStateButton(()=>'');
    }
    else{
      setStateButton('disabled');
    }
  },[getData]);

  return (
    <div className="createVideoGame" onClick={handleClickBase}>
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
                <p className={`messageInput ${error.name.state ? "error" : ""}`}>
                  {error.name.state ? error.name.message : messageGuide.name}
                </p>
              </TextField>

              <TextField
                active={activeLabel.release_date}
                placeholder={""}
                name={"release_date"}
                value={getData.release_date}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"date"}
              >
                <p className={`messageInput ${error.release_date.state ? "error" : ""}`}>
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
                <p className={`messageInput textArea ${error.description.state ? "error" : ""}`}>
                  {error.description.state ? error.description.message : messageGuide.description}
                </p>
              </TextField>
              <div className="container_selection 1 ">
                <h4
                  name={"genres"}
                  className={`h4 ${activeLabel.genres ? "activate" : "deactivate"} `}
                >
                  Genres {messageGuide.genre}
                </h4>
                <Selection2
                  width={"100%"}
                  name={"genres"}
                  version={"v1"}
                  value={stateTextSelection.genres}
                  blurFunction={handleBlur}
                  onchange={handleChangeSelect}
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
                            <button onClick={() => removeSelections(genre.id, "genres")}>X</button>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <p className={`messageSelect ${error.genres.state ? "error" : ""}`}>
                    {error.genres.state ? error.genres.message : messageGuide.genres}
                  </p>
                </Selection2>
              </div>
            </div>
            <div className="createVideogame__form__row 3">
              <TextField
                active={activeLabel.rating}
                name={"rating"}
                value={getData.rating}
                stateFunction={handleChange}
                clickFunction={handleClick}
                type={"text"}
              >
                <p className={`messageInput ${error.rating.state ? "error" : ""}`}>
                  {error.rating.state ? error.rating.message : messageGuide.rating}
                </p>
              </TextField>
              <div className="container_selection 2">
                <h4
                  name={"genres"}
                  className={`h4 ${activeLabel.platform ? "activate" : "deactivate"} `}
                >
                  Platform(*) {messageGuide.platform} 
                </h4>
                <Selection2
                  width={"100%"}
                  name={"platform"}
                  version={"v1"}
                  value={stateTextSelection.platform}
                  blurFunction={handleBlur}
                  onchange={handleChangeSelect}
                  options={platformsSelect}
                >
                  <div className="container_select-selection">
                    {getData.platform.map(e => {
                      return (
                        <div key={e.id} style={{ margin: "2px 3px" }}>
                          <p>
                            {e.name}
                            <button onClick={() => removeSelections(e.id, "platform")}>X</button>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Selection2>
              </div>
            </div>
          </div>
          <div className="createVideogame__form__button">
            <button
              disabled={stateButton}
              className={`button v1 ${stateButton.length ? "disabled" : "enable"} `}
              type="submit"
            >
              <span className="content-button">Save</span>
            </button>
            <button className="button v2" type="button">
              <a href="/home" className="content-button">
                Cancel
              </a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
