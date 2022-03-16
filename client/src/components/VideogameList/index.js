import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './style.scss';

import VideogameCard from '../VideogameCard/index';

const VideogameList = props => {

  const videogames= useSelector(state => state.rootReducer.videoGames);

  const replace= videogames && videogames.slice(30);

  return (
    <div className="videogameList">
      {console.log(replace)}
      hola
        {
            replace && replace.map(element => {
                return <VideogameCard key={element.id} videoGame={element}/>
            })
        }
    </div>
  )
}

VideogameList.propTypes = {}

export default VideogameList