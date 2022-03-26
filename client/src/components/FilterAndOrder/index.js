import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Selection from "../Selection2/index";
import {
  getFilterData,
  getOrderData,
  getFilterAndOrderText,
} from "../../redux/action/actionFilterAndOrder";
import { getPaginationCurrent, getPageCurrent } from "../../redux/action/actionPagination";
import { paginationData } from "../../helpers/pagination";
import "./style.scss";

const FilterAndOrder = props => {
  const stateTextFilterAndOrder = useSelector(
    state => state.filterAndOrder.stateTextFilterAndOrder
  );
  const { videoGames } = props;
  const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
  const genre22 = useSelector(state => state.rootReducer.genres);
  const filterData = useSelector(state => state.filterAndOrder.filterData);
  const dispatch = useDispatch();
  const [stateActivatedLabel, setStateActivatedLabel] = useState({
    genre: stateTextFilterAndOrder.genre.length ? true : false,
    createdOrExisted: stateTextFilterAndOrder.createdOrExisted.length ? true : false,
    alphabetOrRating: stateTextFilterAndOrder.alphabetOrRating.length ? true : false,
    order: stateTextFilterAndOrder.order.length ? true : false,
  });
  const [stateSelectData, setStateSelectData] = useState({
    genre: "",
    createdOrExisted: "",
    alphabetOrRating: "",
    order: "",
  });
  const abstractDataGenre = genre22.map(genre => genre.name);
  const genres = ["all", ...abstractDataGenre];
  const createdOrExisted = ["all", "existed", "created"];
  const alphabetOrRating = ["alphabet", "rating"];
  const ascOrDesc = ["asc", "desc"];

  const onChangeFilter = (name, value) => {
    dispatch(getFilterAndOrderText({ name, value }));
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
        dbCount: videoGames.dbCount,
        genre: name === "genre" ? value : stateTextFilterAndOrder.genre,
        createdOrExisted:
          name === "createdOrExisted" ? value : stateTextFilterAndOrder.createdOrExisted,
      })
    );
  };

  const onChangeOrder = (name, value) => {
    dispatch(getFilterAndOrderText({ name, value }));
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
      dispatch(
        getOrderData({
          videoGames: filterData,
          order: name === "order" ? value : stateTextFilterAndOrder.order,
          alphabetOrRating:
            name === "alphabetOrRating" ? value : stateTextFilterAndOrder.alphabetOrRating,
        })
      )
    );
    dispatch(getPaginationCurrent(paginationData(filterData, 15, 1)));
    dispatch(getPageCurrent(1));
  };

  React.useEffect(() => {
    console.log("useEffect FilterAndOrder archivo ", stateTextFilterAndOrder);
    dispatch(
      getFilterData({
        videoGames: videoGames.resData,
        dbCount: videoGames.dbCount,
        genre: stateSelectData.genre,
        createdOrExisted: stateSelectData.createdOrExisted,
      })
    );
    dispatch(
      getOrderData({
        videoGames: filterData,
        order: stateSelectData.ascOrDesc,
        alphabetOrRating: stateSelectData.alphabetOrRating,
      })
    );
  }, [stateSelection.state]);

  return (
    <div className="filterAndOrder">
      <div className="filterAndOrder__containerFilter">
        <h5>Filter:</h5>
        <div className="filterAndOrder__filterGenre">
          <h4 className={`h4 ${stateActivatedLabel["genre"] ? "activate" : "deactivate"} `}>
            Genre
          </h4>
          <Selection
            onchange={onChangeFilter}
            options={genres}
            version={"v1"}
            name={"genre"}
            value={stateTextFilterAndOrder.genre}
          />
        </div>
        <div className="filterAndOrder__filterCreatedOrExisted">
          <h4 className={`h4 ${stateActivatedLabel.createdOrExisted ? "activate" : "deactivate"} `}>
            Created Or Existed
          </h4>
          <Selection
            onchange={onChangeFilter}
            options={createdOrExisted}
            version={"v2"}
            name={"createdOrExisted"}
            value={stateTextFilterAndOrder.createdOrExisted}
          />
        </div>
      </div>
      <div className="filterAndOrder__containerOrder">
        <h5>Order:</h5>
        <div className="filterAndOrder__OrderAlphabetOrRating">
          <h4
            className={`h4 ${stateActivatedLabel["alphabetOrRating"] ? "activate" : "deactivate"} `}
          >
            Alphabet or Rating
          </h4>
          <Selection
            onchange={onChangeOrder}
            options={alphabetOrRating}
            version={"v1"}
            name={"alphabetOrRating"}
            value={stateTextFilterAndOrder.alphabetOrRating}
          />
        </div>
        <div className="filterAndOrder__OrderAscOrDesc">
          <h4 className={`h4 ${stateActivatedLabel["order"] ? "activate" : "deactivate"} `}>
            Asc or Desc
          </h4>
          <Selection
            onchange={onChangeOrder}
            options={ascOrDesc}
            version={"v2"}
            name={"order"}
            value={stateTextFilterAndOrder.order}
          />
        </div>
      </div>
    </div>
  );
};

FilterAndOrder.propTypes = {};

export default FilterAndOrder;
