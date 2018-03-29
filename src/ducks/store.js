import {createStore, applyMiddleware} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './reducer.js';

// const reducer = combineReducers({
//     tasksReducer: tasksReducer
// })

export default createStore(
    reducer,
    applyMiddleware(reduxPromiseMiddleware())
);