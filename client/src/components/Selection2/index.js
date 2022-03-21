import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  getStateSelection,
} from "../../redux/action/actionFilterAndOrder";
import "./style.scss";

const Selection2 = props => {
  const dispatch = useDispatch();
  const { options, version, functionActiva, name, width } = props;
  const stateSelection = useSelector(
    state => state.filterAndOrder.stateSelection
  );
  const [textSelection, setTextSelection] = useState("");

  const handleClick = e => {
    dispatch(getStateSelection({ state: !stateSelection.state, name: name }));
  };
  const handleChange = async e => {
    let replaces = e.target.innerText.trim().replace(/\-/g, "");
    functionActiva(name, replaces);
    dispatch(getStateSelection({ state: !stateSelection.state, name: name }));
    setTimeout(() => {
      setTextSelection(replaces);
    }, 200);
  };
  return (
    <div style={{width:width}}
      className={`select ${
        stateSelection.state && stateSelection.name === name ? "clicked " : ""
      } ${version} ${options.length < 4 && "short"} ${
        options.length < 3 && "small"
      }`}
    >
      <div
        className={`select__optionSelection ${
          stateSelection.state && stateSelection.name === name ? "clicked " : ""
        } ${version}`}
        onClick={handleClick}
      >
        <h2>{textSelection}</h2>
      </div>
      <div
        className={`select__options ${
          stateSelection.state && stateSelection.name === name ? "clicked " : ""
        } ${version} ${options.length < 4 && "short"} ${
          options.length < 3 && "small"
        }`}
      >
        {options &&
          options.map((elemet, index) => {
            return (
              <div
                className="option"
                onClick={handleChange}
                key={index}
                value={elemet}
              >
                --{elemet}--
              </div>
            );
          })}
      </div>
    </div>
  );
};

Selection2.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  width: PropTypes.string,
};

Selection2.defaultProps = {
  width: "300px",
}



export default Selection2;
