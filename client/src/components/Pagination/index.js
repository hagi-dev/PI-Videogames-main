import React from 'react';
import PropTypes from 'prop-types';

import Button from './ButtonNumber/Button';
import './style.scss';

const Pagination = props => {
    const {countButton,handleClickPagination} = props;
  return (
    <div className="pagination">
        {
            countButton && countButton.map((element,index) => {
              return <Button key={index} handleClickPagination={handleClickPagination} text={element}/>
            })
        }
    </div>
  )
}

Pagination.propTypes = {
    countButton: PropTypes.array,
    handleClickPagination: PropTypes.func
}

export default Pagination

