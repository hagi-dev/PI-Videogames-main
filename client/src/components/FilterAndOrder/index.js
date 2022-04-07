import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Selection from "../Selection2/index";
import {
  getFilterData,
  getOrderData,
  getFilterAndOrderText,
  resetFilter,
} from "../../redux/action/actionFilterAndOrder";
import { getPaginationCurrent, getPageCurrent } from "../../redux/action/actionPagination";
import { paginationData } from "../../helpers/pagination";
import platformAndGenres from "../../helpers/platformAndGenres";
import "./style.scss";

const FilterAndOrder = props => {
  const dispatch = useDispatch();
  const header = useSelector(state => state.rootReducer.header);
  const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
  const stateTextFilterAndOrder = useSelector(
    state => state.filterAndOrder.stateTextFilterAndOrder
  );
  const { videoGames } = props;
  const genresData = useSelector(state => state.rootReducer.genres);
  const filterData = useSelector(state => state.filterAndOrder.filterData);
  const [fiterResponsive, setFilterResponsive] = useState(false);
  const abstractDataGenre = genresData.map(genre => genre.name);
  const genres = ["all", ...abstractDataGenre];
  const createdOrExisted = ["all", "existed", "created"];
  const alphabetOrRating = ["alphabet", "rating", "rating count"];
  const ascOrDesc = ["asc", "desc"];
  // const platform = platformAndGenres;

  const onChangeFilter = (name, value) => {
    dispatch(getFilterAndOrderText({ name, value }));
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
    dispatch(
      getOrderData({
        videoGames: filterData,
        order: name === "order" ? value : stateTextFilterAndOrder.order,
        alphabetOrRating:
          name === "alphabetOrRating" ? value : stateTextFilterAndOrder.alphabetOrRating,
      })
    );
    dispatch(getPaginationCurrent(paginationData(filterData, 15, 1)));
    dispatch(getPageCurrent(1));
  };

  React.useEffect(() => {
    dispatch(
      getOrderData({
        videoGames: filterData,
        order: stateTextFilterAndOrder.order,
        alphabetOrRating: stateTextFilterAndOrder.alphabetOrRating,
      })
    );
    dispatch(
      getOrderData({
        videoGames: filterData,
        order: stateTextFilterAndOrder.order,
        alphabetOrRating: stateTextFilterAndOrder.alphabetOrRating,
      })
    );
  }, [stateSelection.state]);

  React.useEffect(() => {
    console.log("useEffect", window.innerWidth);
    window.addEventListener('resize', changeFilterResponsive);
    return () => {
      window.removeEventListener('resize',  changeFilterResponsive);
    }
  });
  const changeFilterResponsive = () => {
    if(window.innerWidth >= 1157){
      console.log('window.innerWidth >= 1157 validacion', window.innerWidth)
      setFilterResponsive(false);
    }
  }

  return (
    <>
      <div className={`Button__menuFilter ${fiterResponsive ? 'active': ''}`}>
        <button type="button" onClick={(e)=>{ setFilterResponsive(!fiterResponsive)}}>
          Filter And Order 
        </button>
      </div>
      <div className={`filterAndOrder ${fiterResponsive ? 'active': ''}`}>
        <div className='filterAndOrder__containerFilter'>
          <h5>Filter:</h5>
          <div className='filterAndOrder__filterGenre'>
            <h4
              className={`h4 ${
                stateTextFilterAndOrder["genre"].length ? "activate" : "deactivate"
              } `}
            >
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
          <div className='filterAndOrder__filterCreatedOrExisted'>
            <h4
              className={`h4 ${
                stateTextFilterAndOrder.createdOrExisted.length ? "activate" : "deactivate"
              } `}
            >
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
        <div className='filterAndOrder__containerOrder'>
          <h5>Order:</h5>
          <div className='filterAndOrder__OrderAlphabetOrRating'>
            <h4
              className={`h4 ${
                stateTextFilterAndOrder["alphabetOrRating"].length ? "activate" : "deactivate"
              } `}
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
          <div className='filterAndOrder__OrderAscOrDesc'>
            <h4
              className={`h4 ${
                stateTextFilterAndOrder["order"].length ? "activate" : "deactivate"
              } `}
            >
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
    </>
  );
};

FilterAndOrder.propTypes = {};

export default FilterAndOrder;
