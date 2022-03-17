import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

import VideogameCard from '../VideogameCard/index';

const VideogameList = props => {  

  const {data} = props

  return (
    <div className="videogameList">
        {
            data && data.map((element,index) => {
              if(element.message){return <p key={index} style={{color:"white"}} >{element.message}</p>}
              if(!element.message){return <VideogameCard key={element.id} videoGame={element}/>}
            }) 
        }
    </div>
  )
}

VideogameList.propTypes = {
  data: PropTypes.array
}

export default VideogameList