import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Selection from "../Selection2/index";
import { getFilterData, getOrderData } from "../../redux/action/actionFilterAndOrder";
import "./style.scss";

const FilterAndOrder = props => {
  const { videoGames } = props;
  const genre22 = useSelector(state => state.rootReducer.genres);
  const dispatch = useDispatch();
  const [stateActivatedLabel, setStateActivatedLabel] = useState({
    Genre: false,
    CreatedOrExisted: false,
    AlphabetOrRating: false,
    Order: false,
  });
  const [stateSelectData, setStateSelectData] = useState({
    Genre: "",
    CreatedOrExisted: "",
    AlphabetOrRating: "",
    AscOrDesc: "",
  });
  const abstractDataGenre = genre22.map(genre => genre.name);
  const genres = ["all", ...abstractDataGenre];
  const createdOrExisted = ["all", "existed", "created"];
  const alphabetOrRating = ["alphabet", "rating"];
  const ascOrDesc = ["asc", "desc"];

  const onChange = (name, value) => {
    setStateActivatedLabel(prevState => {
      return {
        ...prevState,
        [name]: true,
      };
    });
    setStateSelectData(etem => {
      return { ...etem, [name]: value };
    });
    dispatch(
      getFilterData({
        videoGames: videoGames.resData,
        apiCount: videoGames.apiCount,
        genre: name === "Genre" ? value : stateSelectData.Genre,
        createdOrExisted:
          name === "CreatedOrExisted"
            ? value
            : stateSelectData.CreatedOrExisted,
      })
      
    );
  };

  return (
    <div className="filterAndOrder">
      <div className="filterAndOrder__containerFilter">
        <h5>Filter:</h5>
        <div className="filterAndOrder__filterGenre">
          <h4
            className={`h4 ${
              stateActivatedLabel["Genre"] ? "activate" : "deactivate"
            } `}
          >
            Genre
          </h4>
          <Selection
            onchange={onChange}
            options={genres}
            version={"v1"}
            name={"Genre"}
          />
        </div>
        <div className="filterAndOrder__filterCreatedOrExisted">
          <h4
            className={`h4 ${
              stateActivatedLabel.CreatedOrExisted ? "activate" : "deactivate"
            } `}
          >
            Created Or Existed
          </h4>
          <Selection
            onchange={onChange}
            options={createdOrExisted}
            version={"v2"}
            name={"CreatedOrExisted"}
          />
        </div>
      </div>
      <div className="filterAndOrder__containerOrder">
        <h5>Order:</h5>
        <div className="filterAndOrder__OrderAlphabetOrRating">
          <h4
            className={`h4 ${
              stateActivatedLabel["AlphabetorRating"]
                ? "activate"
                : "deactivate"
            } `}
          >
            Alphabet or Rating
          </h4>
          <Selection
            onchange={onChange}
            options={alphabetOrRating}
            version={"v1"}
            name={"AlphabetorRating"}
          />
        </div>
        <div className="filterAndOrder__OrderAscOrDesc">
          <h4
            className={`h4 ${
              stateActivatedLabel["AscorDesc"] ? "activate" : "deactivate"
            } `}
          >
            Asc or Desc
          </h4>
          <Selection
            onchange={onChange}
            options={ascOrDesc}
            version={"v2"}
            name={"AscorDesc"}
          />
        </div>
      </div>
    </div>
  );
};

FilterAndOrder.propTypes = {};

export default FilterAndOrder;
