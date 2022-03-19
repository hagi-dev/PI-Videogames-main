import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const IconPlataform = props => {
    const { plataform } = props;
    const image = require(`../../assets/img/iconPlataform/${plataform}.png`);
    return (
    <div className="conatinerIcon">
        <img className="icon" src={image} alt= {`${plataform} icons`} /> 
        <h3>{plataform}</h3> 
    </div>
    )
}

IconPlataform.propTypes = {
    plataform: PropTypes.string
}

export default IconPlataform;