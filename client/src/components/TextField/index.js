import React from "react";
import PropTypes from "prop-types";
import "./style.scss";


const TextField = props => {
  const {
    type,
    name,
    width,
    stateFunction,
    stateInputSelect,
    value,
    blurFunction,
    clickFunction,
    detail,
    active,
    textArea,
    removeFunction,
    require,
    children,
  } = props;
  return (
    <div className="container_textField">
      <label className={`label ${active && "active"}`}>{name}{require && '*'}</label>
      {!textArea ? (
        <>
          <input
            list="data"
            className="textField input"
            style={{ width: width }}
            name={name}
            value={value}
            onBlur={blurFunction}
            onChange={stateFunction}
            onClick={clickFunction}
            type={type}
          />
          {children}
        </>
      ) : (
        <>
          <textarea
            className="textField textArea"
            style={{ width: width }}
            name={name}
            value={value}
            onBlur={blurFunction}
            onChange={stateFunction}
            onClick={clickFunction}
            type={type}
          />
          {children}
        </>
      )}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string,
  width: PropTypes.string,
  stateFunction: PropTypes.func,
  stateInputSelect: PropTypes.array,
  blurFunction: PropTypes.func,
  clickFunction: PropTypes.func,
  type: PropTypes.string,
  detail: PropTypes.array,
  active: PropTypes.bool,
  textArea: PropTypes.bool,
  value: PropTypes.string,
  removeFunction: PropTypes.func,
};

TextField.defaultProps = {
  name: "I don't have a name",
  width: "300px",
  textArea: false,
};

export default TextField;
