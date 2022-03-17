import React from 'react';
import PropTypes from 'prop-types';

const VideoGameCard = props => {
    const { videoGame } = props;
    return (
    <div style={{width: "300px",margin: '10px 20px', height: "150px"}}>
        <h3 style={{color:'white', margin: "0 50px",textAlign:'center'}}>{videoGame.name}</h3>
    </div>
    )
}

VideoGameCard.propTypes = {
    videoGamer: PropTypes.object,
}

export default VideoGameCard;