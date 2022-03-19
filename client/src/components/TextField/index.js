import React from 'react'
import PropTypes from 'prop-types'

const TextField = props => {
    const {name, width, stateFunction, stateInput, blurFunction} = props;
    return (
        <input style={{width:width}} name={name} value={stateInput} onBlur={blurFunction} onChange={stateFunction} onClick={stateFunction} type="text" />
    )
}

TextField.propTypes = {
    name: PropTypes.string,
    width: PropTypes.string,
    stateFunction: PropTypes.func,
    stateInput: PropTypes.string,
    blurFunction: PropTypes.func,
}

export default TextField