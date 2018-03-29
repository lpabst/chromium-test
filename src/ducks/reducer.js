import * as mainService from './../services/mainService.js';

const LOG_IN = 'LOG_IN'
const LOG_IN_PENDING = 'LOG_IN_PENDING'
const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'


const initialState = {
  loading: false,
  loggedIn: true,
  username: 'From Redux',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_PENDING:
      return Object.assign({}, state, {loading: true})
    case LOG_IN_FULFILLED:
      console.log(action)
      return Object.assign({}, state, {loading: false, })
    
    default:
      return state;
    }
}


export function logIn(){
    return{
      type: LOG_IN,
      payload: mainService.logIn()
    } 
}
