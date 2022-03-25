import React from "react";
import PropTypes from "prop-types";

import Button from "./ButtonNumber/Button";
import "./style.scss";

const Pagination = props => {
  const { countButton, handleClickPagination,currentPage } = props;
  const [stateButton, setStateButton] = React.useState({
    [currentPage]: true,
  });

  return (
    <div className="pagination">
      {countButton &&
        countButton.map((element, index) => {
          return (
            <Button
              state={stateButton[element]}
              key={index}
              handleClickPagination={handleClickPagination}
              text={element}
              functionChange={setStateButton}
            />
          );
        })}
    </div>
  );
};

Pagination.propTypes = {
  countButton: PropTypes.array,
  handleClickPagination: PropTypes.func,
};

export default Pagination;
