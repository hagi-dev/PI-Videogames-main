import React from 'react'
import PropTypes from 'prop-types'

const VideoGameCard = props => {
    const { videoGame } = props;
    return (
    <div>VideoGameCard</div>
    )
}

VideoGameCard.propTypes = {
    videoGamer: PropTypes.object
}

export default VideoGameCard;