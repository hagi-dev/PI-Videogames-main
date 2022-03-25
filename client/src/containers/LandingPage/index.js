import React, { useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import Selection2 from "../../components/Selection2";
import { getStateSelection } from "../../redux/action/actionFilterAndOrder";
import { getFilterData } from "../../redux/action/actionFilterAndOrder";
import "./style.scss";

const LandingPage2 = props => {
  const videoGames = useSelector(state => state.rootReducer.videoGames);
  const genre22 = useSelector(state => state.rootReducer.genres);
  const dispatch = useDispatch();
  const filterData = useSelector(state => state.filterAndOrder.filterData);
  const [stateActivated, setStateActivated] = useState({
    Genre: false, //genre
    CreatedOrExisted: false, //created or existed
  });
  const abstractDataGenre = genre22.map(genre => genre.name);
  const stateSelection = useSelector(
    state => state.filterAndOrder.stateSelection
  );
  const genres = ["all", ...abstractDataGenre];
  const createdOrExisted = ["all", "existed", "created"];
  const alphabetOrRating = ["alphabet", "rating"];
  const ascOrDesc = ["asc", "desc"];
  const [stateFilter,setStateFilter] = useState({
    Genre: "",
    CreatedOrExisted: "",
    Order: "",
    AlphabetOrRating: "",
  }) 

  const handleClick = () => {
    stateSelection.state && dispatch(getStateSelection({state:false ,name:''}));
  };

  const handleSelection = (name,value) => {
    let nameformat= name.replace(/\s/g, '');
    setStateActivated(etem => {
      return { ...etem, [nameformat]: true };
    });
    setStateFilter(etem => {
      return { ...etem, [nameformat]: value };
    })
  };
  
useEffect(() => {
  dispatch(
    getFilterData({
      videoGames: videoGames.resData,
      apiCount: videoGames.apiCount,
      genre: stateFilter.Genre,
      createdOrExisted: stateFilter.CreatedOrExisted,
    })
  );
} , [stateFilter])

  return (
    <div className="landingPage" onClick={handleClick}>
      {/* <div className="filterAndOrder__containerFilter">
        <h5>Filter:</h5>
        <div
          className="filterAndOrder__filterGenre"
          onClick={() => {
            dispatch(
              getStateSelection({ state: !stateSelection.state, name: "Genre" })
            );
          }}
        >
          <h4
            className={`h4 ${
              stateActivated.Genre ? "activate" : "deactivate"
            } `}
          >
            Genre
          </h4>
          <Selection2
            activa={stateActivated}
            functionActiva={handleSelection}
            options={genres}
            version={"v1"}
            name={"Genre"}
          />
        </div>
        <div
          className="filterAndOrder__filterCreatedOrExisted"
          onClick={() => {
            dispatch(
              getStateSelection({
                state: !stateSelection.state,
                name: "Created Or Existed",
              })
            );
          }}
        >
          <h4
            className={`h4 ${
              stateActivated.CreatedOrExisted ? "activate" : "deactivate"
            } `}
          >
            Created Or Existed
          </h4>
          <Selection2
            activa={stateActivated}
            functionActiva={handleSelection}
            options={createdOrExisted}
            version={"v2"}
            name={"Created Or Existed"}
          />
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '80%',
        height: '80%',
        overflow: 'auto',
        margin: '0 auto',
      }} className="filterAndOrder__containerOrder">
        {
          filterData && filterData.map((filter,index) => {
            return <p key={index} style={{
              color: '#fff',
              margin: '20px 20px',
            }}>{filter.name}</p>
          })
        }
      </div> */}
    </div>
  );
};

export default LandingPage2;
