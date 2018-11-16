import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';

// Reduxers
import reducers from './reducers';

export function initializeStore() {
    return createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}