import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import videogame from '../../assets/img/videogame.png';
import './style.scss';

const Header = () => {
  return (
    <div className="header">
        <div className="header__container_logo">
            <div className="header__logo">
                <div className="header__logo-borde">
                    <h2>VIDEOGAMES</h2>
                </div>
            </div>
        </div>
        <div className="header__image">
            <img src={videogame} alt="videogame" />
        </div>
        <div className="header__formSearch">
            <form>
                <label>Name</label>
                <input type="text" />
                <input type= 'submit' value="Search"/>
            </form>
        </div>
        <div className="header__perfil"></div>
        <div className="header__autorCreated">
            <p>Created by Hagi-dev*</p>
        </div>
    </div>
  )
}

export default Header;