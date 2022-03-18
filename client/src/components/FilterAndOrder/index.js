import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import Selection from '../Selection/index';
import {getStateSelection} from '../../redux/action/actionFilterAndOrder';
import './style.scss';

const FilterAndOrder = props => {
    const genre22 = useSelector(state => state.rootReducer.genres);
  const dispatch = useDispatch();
  const [stateActivated, setStateActivated] = useState({
    state1: false,//genre
    state2: false,//created or existed
    state3: false,//alphabet or rating
    state4: false,//asc or desc
  });
  const abstractDataGenre = genre22.map(genre => genre.name);
  const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
  const genres =['all', ...abstractDataGenre];
  const createdOrExisted =["all","existed","created"];
  const alphabetOrRating =["alphabet","rating"];
  const ascOrDesc =["asc","desc"];


  return (
    <div className="filterAndOrder">
      {console.log('genre aca',genre22)}
      <div className="filterAndOrder__containerFilter">
        <h5>Filter:</h5>
        <div className="filterAndOrder__filterGenre" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Genre'}))}}>
          <h4 className={`h4 ${stateActivated.state1  ? 'activate' : 'deactivate'} `}>Genre</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={genres} version={'v1'} name={'Genre'} />
        </div>
        <div className="filterAndOrder__filterCreatedOrExisted" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Created Or Existed'}))}}>
          <h4  className={`h4 ${stateActivated.state2  ? 'activate' : 'deactivate'} `}>Created Or Existed</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={createdOrExisted} version={'v2'} name={'Created Or Existed'} />
        </div>
      </div>
      <div className="filterAndOrder__containerOrder">
        <h5>Order:</h5>
        <div className="filterAndOrder__OrderAlphabetOrRating" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Alphabet or Rating'}))}}>
          <h4 className={`h4 ${stateActivated.state3  ? 'activate' : 'deactivate'} `}>Alphabet or Rating</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={alphabetOrRating} version={'v1'} name={'Alphabet or Rating'} />
        </div>
        <div className="filterAndOrder__OrderAscOrDesc" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Asc or Desc'}))}}>
          <h4  className={`h4 ${stateActivated.state4  ? 'activate' : 'deactivate'} `}>Asc or Desc</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={ascOrDesc} version={'v2'} name={'Asc or Desc'} />
        </div>
      </div>
    </div>
  )
}

FilterAndOrder.propTypes = {}

export default FilterAndOrder;