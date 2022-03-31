import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";

import {
  getVideogameByName,
  getTextHeader,
  reset,
} from "../../redux/action/actionRoot";
import { resetFilter } from "../../redux/action/actionFilterAndOrder";
import { resetPagination } from "../../redux/action/actionPagination";
import videogame from "../../assets/img/videogame.png";
import {formatUpperCase} from '../../helpers/format/formatUpperCase';
import "./style.scss";

const Header = () => {
  const header = useSelector(state => state.rootReducer.header);
  const dispatch = useDispatch();
  const [active, setActive] = useState(!header.text.length ? false : true);
  const handleClickInput = (e) => {
     console.log('este es el evento click input  ', e); 
    e.isTrusted && setActive(true);
  };

  const handleChange = e => {
    let changeText = e.target.value;
    dispatch(getTextHeader({value:changeText, name: 'text'}));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if(header.text !== ''){
    dispatch(getVideogameByName(formatUpperCase(header.text)));
    dispatch(getTextHeader({value:'Search', name: 'title'}));
    dispatch(reset());
    dispatch(resetFilter());
    dispatch(resetPagination());
    }
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
      <div className="header__image">
        <img src={videogame} alt="videogame" />
        <p>{header.title}</p>
      </div>
      <div className="header__formSearch">
        <form onSubmit={handleSubmit}>
          <label className={`label ${active && "active"}`}>
            Search for name....
          </label>
          <input
            value={header.text}
            onChange={handleChange}
            onClick={handleClickInput}
            type="text"
          />
          <button type="submit"> Search</button>
          {header.title=== 'Search' && <a href="/home"><span>←</span><p>Go Home</p></a>}
        </form>
      </div>
      <div className="header__perfil"></div>
      <div className="header__autorCreated">
        <h6>Created by Hagi-dev*</h6>
      </div>
    </div>
  );
};

export default Header;
