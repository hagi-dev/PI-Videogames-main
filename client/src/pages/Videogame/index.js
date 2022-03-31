import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getVideogameById, resetVideogame } from "../../redux/action/actionRoot";
import IconPlataform from "../../components/IconPlataform/index";
import Loader from "../../components/Loader/index";
import "./style.scss";

const Videogame = () => {
  let imgDefaul =
    "https://holatelcel.com/wp-content/uploads/2020/08/mario-bross-google-game--1280x720.png";
  const dispatch = useDispatch();
  const { id } = useParams();
  const videoGame = useSelector(state => state.rootReducer.videoGame);
  let released = new Date(videoGame.releaseDate).toDateString();
  const [seeDescription, setSeeDescription] = useState({
    see: false,
    orientationName: "ver mas...",
  });

  const handleSeeDescription = () => {
    setSeeDescription(() => {
      return {
        orientationName: seeDescription.see ? "ver mas..." : "ver menos...",
        see: !seeDescription.see,
      };
    });
  };

  useEffect(() => {
    if (/^\d+$/.test(id)) {
      dispatch(resetVideogame());
      dispatch(getVideogameById(id));
    }else{
      alert("id not valid");
      alert("redirect to home");
      window.location.href = "/";
    }
  }, []);
  return videoGame.name ? (
    <div className={`videogame  ${videoGame.name ? "active" : ""}`}>
      <div className='videogame__backHome'>
        <Link to='/home'>
          <p>←</p>
          <span>Back Home</span>
        </Link>
      </div>
      {videoGame.name && (
        <div className={`videogame__image ${videoGame.name ? "active" : ""}`}>
          <img src={videoGame.image ? videoGame.image : imgDefaul} alt={videoGame.name} />
        </div>
      )}
      <div className='videogame__descriptionPart1'>
        <div className='videogame__descriptionPart1_title'>
          <p>{videoGame.name}</p>
        </div>
        <div className='videogame__descriptionPart1_released'>
          <h3>Released : {released}</h3>
        </div>
        <div className='videogame__descriptionPart1_rating'>
          <h3>Rating : {videoGame.rating} point</h3>
        </div>
        <div className='videogame__descriptionPart1_genres'>
          <h3>Genres</h3>
          <ul className={`videogame__descriptionPart1_genre-list ${videoGame.name && "active"}`}>
            {videoGame.genres &&
              videoGame.genres.map((element, index) => {
                return <li key={element.id}>{element.name}</li>;
              })}
          </ul>
        </div>
      </div>
      <div className='videogame__descriptionPart2'>
        <div className={`videogame__descriptionPart2_description ${seeDescription.see && "see"}`}>
          <h3>Description :</h3>
          <div className='videogame__descriptionPart2_decription-paragraph'>
            <div>
              <p>{videoGame.description}</p>
            </div>
            <button onClick={handleSeeDescription} type='button'>
              {seeDescription.orientationName}
            </button>
          </div>
        </div>
        <div className='videogame__descriptionPart2_plataform'>
          <h3>Available Plataforms</h3>
          <div className='videogame__descriptionPart2_plataform-icons'>
            {videoGame.plataform &&
              videoGame.plataform.map((element, index) => {
                return <IconPlataform key={index} plataform={element} />;
              })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='loader'>
      <Loader />
    </div>
  );
};

export default Videogame;
