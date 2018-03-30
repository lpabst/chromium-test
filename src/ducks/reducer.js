import * as mainService from './../services/mainService.js';

const LOG_IN = 'LOG_IN'
const LOG_IN_PENDING = 'LOG_IN_PENDING'
const LOG_IN_REJECTED = 'LOG_IN_REJECTED'
const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'

const IS_LOGGED_IN = 'IS_LOGGED_IN'
const IS_LOGGED_IN_PENDING = 'IS_LOGGED_IN_PENDING'
const IS_LOGGED_IN_FULFILLED = 'IS_LOGGED_IN_FULFILLED'

const LOG_OUT = 'LOG_OUT'
const LOG_OUT_PENDING = 'LOG_OUT_PENDING'
const LOG_OUT_REJECTED = 'LOG_OUT_REJECTED'
const LOG_OUT_FULFILLED = 'LOG_OUT_FULFILLED'


const initialState = {
  loading: false,
  loggedIn: false,
  username: 'From Redux',
}

export default function reducer(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case LOG_IN_PENDING:
      return Object.assign({}, state, {loading: true})
    case LOG_IN_REJECTED:
      return Object.assign({}, state, {loading: false})
    case LOG_IN_FULFILLED:
      if( action.payload.loggedIn ){
        return Object.assign({}, state, {loading: false, username:action.payload.username, loggedIn:true})
      } else {
        window.alert('Invalid E-Mail or Password.')
        return Object.assign({}, state, {loading: false, username:'', loggedIn:false})
      }
    case IS_LOGGED_IN_FULFILLED:
      if( action.payload.loggedIn ){
        return Object.assign({}, state, {loading: false, username:action.payload.username, loggedIn:true})
      } else {
        return state;
      }
    case LOG_OUT_PENDING:
      return Object.assign({}, state, {loading: true})
    case LOG_OUT_REJECTED:
      return Object.assign({}, state, {loading: false})
  case LOG_OUT_FULFILLED:
      return Object.assign({}, state, {loading: false, username:'', loggedIn:false})
    
    default:
      return state;
    }
}





export function logIn(loginCredentials){
    return{
      type: LOG_IN,
      payload: mainService.logIn(loginCredentials)
    } 
}

export function isLoggedIn(){
    return{
      type: IS_LOGGED_IN,
      payload: mainService.isLoggedIn()
    } 
}

export function logOut(){
    return{
      type: LOG_OUT,
      payload: mainService.logOut()
    } 
}
