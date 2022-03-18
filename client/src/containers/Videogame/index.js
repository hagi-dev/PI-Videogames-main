import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {getVideogameById} from '../../redux/action/actionRoot';

const Videogame = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const videoGame = useSelector(state => state.rootReducer.videoGame);
  useEffect(()=>{
    // dispatch(getVideogameById(id));
  },[])
  return (
    <div className="videogame">
      <div className="videogame__image">
        <img src={videoGame.image} alt={videoGame.name} />
      </div>
      <div className="videogame__descriptionPart1">
        <div className="videogame__descriptionPart1-title">
          <h1>{videoGame.name}</h1>
        </div>
        <div className="videogame__descriptionPart1-released">
          <p>Released: {videoGame.released}</p>
        </div>
        <div className="videogame__descriptionPart1-rating">
          <p>Rating: {videoGame.rating} point</p>
        </div>
        <div className="videogame__descriptionPart1-genre">
          <h3></h3>
          <div>

          </div>
        </div>
      </div>
      <div className="videogame__descriptionPart2">
        <div className="videogame__descriptionPart2-description"></div>
        <div className="videogame__descriptionPart2-plataform"></div>
      </div>
    </div>
  )
}

export default Videogame;