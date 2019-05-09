import { combineReducers } from 'redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth'
import me from './me'
import intl from './intl'

export default combineReducers({
  routing,
  reduxAsyncConnect,
  auth,
  me,
  intl,
  global
})
