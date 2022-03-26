import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  getVideogameByName,
  getAllVideoGames,
  reset,
} from "../../redux/action/actionRoot";
import { resetFilter } from "../../redux/action/actionFilterAndOrder";
import { resetPagination } from "../../redux/action/actionPagination";
import videogame from "../../assets/img/videogame.png";
import {formatUpperCase} from '../../helpers/format/formatUpperCase';
import "./style.scss";

const Header = () => {
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const handleClickInput = (e) => {
     console.log('este es el evento click input  ', e); 
    e.isTrusted && setActive(true);
  };

  const handleResetHomet = (e) => {
    dispatch(reset());
    dispatch(resetFilter());
    dispatch(resetPagination());
    dispatch(getAllVideoGames());
  }

  const handleChange = e => {
    let changeText = e.target.value;
    setSearchText(() => {
      return {
        ...searchText,
        name: changeText,
      };
    });
  };

  const handleBlur = e => {
      console.log('este es el evento blur  ', e);
    
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getVideogameByName(formatUpperCase(searchText.name)));
  };

  return (
    <div className="header">
      <div className="header__container_logo">
        <div className="header__logo">
          <div className="header__logo-borde">
            <h2>VIDEOGAMES</h2>
          </div>
        </div>
      </div>
      <div className="header__image" onClick={handleResetHomet}>
        <img src={videogame} alt="videogame" />
        <p>Home</p>
      </div>
      <div className="header__formSearch">
        <form onSubmit={handleSubmit}>
          <label className={`label ${active && "active"}`}>
            Search for name....
          </label>
          <input
            value={searchText.name}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={handleClickInput}
            type="text"
          />
          <button type="submit"> Search</button>
        </form>
      </div>
      <div className="header__perfil"></div>
      <div className="header__autorCreated">
        <p>Created by Hagi-dev*</p>
      </div>
    </div>
  );
};

export default Header;
