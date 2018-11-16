// Libraries
import { combineReducers } from 'redux';

// Actions
import Boat from './Boat';

const reducers = combineReducers({ boat: Boat })

export default reducers;