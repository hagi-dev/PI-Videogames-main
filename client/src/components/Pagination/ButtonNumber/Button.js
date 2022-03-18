import React from 'react';
import PropTypes from 'prop-types';

import './styleButton.scss';

const Button = props => {
    const {handleClickPagination, text} = props
  return (
    <div className="Button" onClick={handleClickPagination}>
        <button type="button" className="button" >{text}</button>
    </div>
  )
}

Button.propTypes = {
    handleClickPagination: PropTypes.func,
    text: PropTypes.number
}

export default Button;