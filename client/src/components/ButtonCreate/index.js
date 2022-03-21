import React from 'react';
import {Link} from 'react-router-dom';

import './style.scss';

const ButtonCreate = props => {
  return (
    <button type="button" className="buttonCreate" onClick={props.handleClick}>
        <Link to={`/videogame/create`} >
            <span className="buttonCreate__text">+</span>
        </Link>
    </button>
  )
}


export default ButtonCreate;