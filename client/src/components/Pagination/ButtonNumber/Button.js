import React from 'react';
import PropTypes from 'prop-types';

import './styleButton.scss';

const Button = props => {
    const {handleClickPagination, text, state,functionChange} = props;
  return (
    <div className={`Button ${state ? 'current' : ''}`} onClick={
      (e) => {
        handleClickPagination(e);
        functionChange((item)=>{
          return {
            [text]: true
          };
        });
      }
    }>
        <button type="button" className="button" >{text}</button>
    </div>
  )
}

Button.propTypes = {
    handleClickPagination: PropTypes.func,
    text: PropTypes.number,
    current: PropTypes.bool
}


export default Button;