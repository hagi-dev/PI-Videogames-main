import { combineReducers } from 'redux';

import rootReducer from './rootReducer';
import filter from './filter';

const reducers = combineReducers({
    rootReducer,
    filter
});

export default reducers;