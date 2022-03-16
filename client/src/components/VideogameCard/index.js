import React from 'react';
import PropTypes from 'prop-types';

const VideoGameCard = props => {
    const { videoGame } = props;
    return (
    <div>
        <h3>{videoGame.name}</h3>
    </div>
    )
}

VideoGameCard.propTypes = {
    videoGamer: PropTypes.object
}

export default VideoGameCard;