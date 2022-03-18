import { combineReducers } from 'redux';

import rootReducer from './rootReducer';
import filterAndOrder from './filterAndOrder';
import pagination from './pagination';

const reducers = combineReducers({
    rootReducer,
    filterAndOrder,
    pagination
});

export default reducers;