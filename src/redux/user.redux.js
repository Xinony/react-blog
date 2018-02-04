import axios from 'axios'

/**
 * type
 */

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTER = 'REGISTER'
const ERROR_USER = 'ERROR_USER'

/**
 * state
 */
const initState = {
  user: '',
  msg: ''
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function user(state=initState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.body,
        msg: action.payload.message
      }
    case REGISTER:
      return {
        ...state,
        user: '',
        msg: action.payload.message
      }
    case LOGOUT:
      return {
        user: '',
        msg: ''
      }
    case ERROR_USER:
      return {
        ...state,
        user: '',
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */

function loginType(data) {
  return {
    type: LOGIN,
    payload: data
  }
}

function registerType(data) {
  return {
    type: REGISTER,
    payload: data
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

function errorMsg(data) {
  return {
    type: ERROR_USER,
    payload: data
  }
}

export function login({
  username,
  password
}) {
  return dispatch => {
    axios.post('/users/login', {
      username,
      password
    })
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(loginType(res.data))
      } else {
        dispatch(errorMsg(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export function register({
  username,
  password
}) {
  return dispatch => {
    axios.post('/users', {
      username,
      password
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerType(res.data))
      } else {
        dispatch(errorMsg(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}