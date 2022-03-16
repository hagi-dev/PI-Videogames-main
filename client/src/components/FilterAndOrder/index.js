import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import Selection from '../Selection/index';
import {getStateSelection} from '../../redux/action/actionFilterAndOrder';
import './style.scss';

const FilterAndOrder = props => {
  const dispatch = useDispatch();
  const [stateActivated, setStateActivated] = useState({
    state1: false,//genre
    state2: false,//created or existed
    state3: false,//alphabet or rating
    state4: false,//asc or desc
  });
  const createdOrExisted = useSelector(state => state.createdOrExisted);
  const stateSelection = useSelector(state => state.filter.stateSelection);
  const prueba =["all","existed","created","all","existed","created"
  ,"all","existed","created","all","existed","created","all","existed","created","all","existed","created","all","existed","created","all","existed","created","all","existed","created"]


  return (
    <div className="filterAndOrder">
      <div className="filterAndOrder__containerFilter">
        <h5>Filter:</h5>
        <div className="filterAndOrder__filterGenre" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Genre'}))}}>
          <h4 className={`h4 ${stateActivated.state1  ? 'activate' : 'deactivate'} `}>Genre</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={prueba} version={'v1'} name={'Genre'} />
        </div>
        <div className="filterAndOrder__filterCreatedOrExisted" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Created Or Existed'}))}}>
          <h4  className={`h4 ${stateActivated.state2  ? 'activate' : 'deactivate'} `}>Created Or Existed</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={prueba} version={'v2'} name={'Created Or Existed'} />
        </div>
      </div>
      <div className="filterAndOrder__containerOrder">
        <h5>Order:</h5>
        <div className="filterAndOrder__OrderAlphabetOrRating" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Alphabet or Existed'}))}}>
          <h4 className={`h4 ${stateActivated.state3  ? 'activate' : 'deactivate'} `}>Alphabet or Existed</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={prueba} version={'v1'} name={'Alphabet or Existed'} />
        </div>
        <div className="filterAndOrder__OrderAscOrDesc" onClick={()=>{dispatch(getStateSelection({state:!stateSelection.state ,name:'Asc or Desc'}))}}>
          <h4  className={`h4 ${stateActivated.state4  ? 'activate' : 'deactivate'} `}>Asc or Desc</h4>
          <Selection activa={stateActivated} functionActiva={setStateActivated} options={prueba} version={'v2'} name={'Asc or Desc'} />
        </div>
      </div>
    </div>
  )
}

FilterAndOrder.propTypes = {}

export default FilterAndOrder;