import { combineReducers } from 'redux';

import rootReducer from './rootReducer';
import filterAndOrder from './filterAndOrder';

const reducers = combineReducers({
    rootReducer,
    filterAndOrder
});

export default reducers;