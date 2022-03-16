import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './style.scss';

import VideogameCard from '../VideogameCard/index';

const VideogameList = props => {  

  const {data} = props

  const replace= data && data.slice(30);

  return (
    <div className="videogameList">
      {console.log(replace)}
      {/* {replace[0] && replace[0].name}
      {replace[1] && replace[1].name} */}
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