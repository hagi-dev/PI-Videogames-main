import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const IconPlataform = props => {
    const { plataform } = props;
    const urlIcon = `https://videogamesimg.s3.sa-east-1.amazonaws.com/iconPlataform/${plataform}.png`;
    return (
    <div className="conatinerIcon">
        <img className="icon" src={urlIcon} alt= {`${plataform} icons`} /> 
        <h3>{plataform}</h3> 
    </div>
    )
}

IconPlataform.propTypes = {
    plataform: PropTypes.string
}

export default IconPlataform;