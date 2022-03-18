import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const VideoGameCard = props => {
    const { videoGame } = props;
    return (
        <Link to={'/videogames/'+videoGame.id} className='videoGameCard'>
            <dic className='videoGameCard__image'>
                <img src={videoGame.image} alt={videoGame.name} />
            </dic>
            <div className='videoGameCard__title'>
                <h3>{videoGame.name}</h3>
            </div>
            <div className='videoGameCard__genres'>
                {
                videoGame.genres && videoGame.genres.map(genre => {
                        return <p key={genre.id}>{genre.name}</p>
                })
                }
            </div>
        </Link>
    )
}

VideoGameCard.propTypes = {
    videoGamer: PropTypes.object,
}

export default VideoGameCard;