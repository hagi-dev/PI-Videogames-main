import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import TextField from "../../components/TextField/index";
import { getAllGenres } from "../../redux/action/actionRoot";
import { getStateSelection } from "../../redux/action/actionFilterAndOrder";
import Selection2 from "../../components/Selection2";

import "./style.scss";

const CreateVideogame = () => {
  const stateSelection = useSelector(
    state => state.filterAndOrder.stateSelection
  );
  const dispatch = useDispatch();
  const genres = useSelector(state => state.rootReducer.genres);
  const options = genres.map(genre => genre.name);
  const platform = [
    { id: 1, name: "PC" },
    { id: 2, name: "PlayStation" },
    { id: 3, name: "Xbox" },
    { id: 4, name: "Nintendo" },
    { id: 5, name: "Android" },
  ];
  const dataSelections={
    platform:platform,
    genres:genres
  }
  const platforms=[
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Android",
  ]
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
    //let {name,value} = e.target;
    setGetData({
      ...getData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelect = (name, value) => {
    setActiveLabel((prevState) => ({
      ...prevState,
      [name]: true,
    }));
    console.log('name', name);
    let dataSelection = dataSelections[name].find(element => element.name === value);
    
    console.log('state ',dataSelection);
    setGetData(item => {
      return {
        ...item,
        [name]: [...item[name], {...dataSelection}],
      };
    });
    console.log('getData ',getData);
  };
  console.log("getData ", getData);
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

  const handleClickBase = () => {
    stateSelection.state &&
      dispatch(getStateSelection({ state: false, name: "" }));
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

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
                />
                <div style={{display:"flex", flexWrap:"wrap"}}>
                  {
                    getData.genres.map(genre => {
                      return (
                        <div key={genre.id} style={{margin:"2px 3px"}}>
                          <p>{genre.name}</p>
                          <button
                            onClick={() => removeSelections(genre.id, "genres")}
                          >
                            X
                          </button>
                        </div>
                      );
                    })
                  }
                </div>
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
              />
              <div className="container_selection 2">
                <h4
                  name={"genres"}
                  className={`h4 ${
                    activeLabel.platform ? "activate" : "deactivate"
                  } `}
                >
                  Platform
                </h4>
                <Selection2
                  width={"100%"}
                  name={"platform"}
                  version={"v1"}
                  blurFunction={handleBlur}
                  functionActiva={handleChangeSelect}
                  options={platforms}
                />
                <div style={{display:"flex", flexWrap:"wrap"}}>
                  {
                    getData.platform.map(e => {
                      return (
                        <div key={e.id} style={{margin:"2px 3px"}}>
                          <p>{e.name}</p>
                          <button
                            onClick={() => removeSelections(e.id, "genres")}
                          >
                            X
                          </button>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
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
