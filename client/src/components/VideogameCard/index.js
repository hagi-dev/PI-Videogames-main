import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './prueba.scss';

const VideoGameCard = props => {
    let imgDefaul = 'https://holatelcel.com/wp-content/uploads/2020/08/mario-bross-google-game--1280x720.png';
    const { videoGame } = props;
    
    return (
        <Link to={'/videogames/'+videoGame.id} className='videoGameCard'>
            <div className='videoGameCard__image'>
                <img src={videoGame.image ? videoGame.image : imgDefaul} alt={videoGame.name} />
            </div>
            <div className='videoGameCard__title'>
                <h3>{videoGame.name}</h3>
            </div>
            <div className='videoGameCard__genres'>
                <div className='videoGameCard__genres-container'>
                    {
                    videoGame.genres && videoGame.genres.map(genre => {
                            return <p key={genre.id}>{genre.name}</p>
                    })
                    }
                </div>
            </div>
        </Link>
    )
}

VideoGameCard.propTypes = {
    videoGamer: PropTypes.object,
}

export default VideoGameCard;