import React from "react";
import { Link } from "react-router-dom";

import Landing from "../../assets/img/SuperMario.png";
import "./style.scss";

const LandingPage2 = props => {

  const handlerClick = () => {
    setTimeout(() => {
      window.location.href = "/home";
    },300)
  }
  return (
    <div className='landingPage'>
      <div className='landingPage__img'>
        <img src={Landing} />
        <div className='landingPage__img-title'>
          <h1>VIDEOGAMES</h1>
        </div>
      </div>
      <div className='landingPage__buttonHome' onClick={handlerClick}>
        <a>Go Home  <span>{'  >>'}</span></a>
      </div>
    </div>
  );
};

export default LandingPage2;
