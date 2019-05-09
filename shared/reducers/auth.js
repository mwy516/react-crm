import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/auth'

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  loaded: false,
  error: null,
  loggedIn: false
})

export default handleActions({
  [actions.loginRequested] (state) {
    return state.set('loading', true)
  },
  [actions.loginSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
      .set('loggedIn', true)
  },
  [actions.loginFailed] (state, action) {
    return state.set('loading', false)
      .set('error', action.payload)
  },
  [actions.validateTokenSucceeded] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', Immutable.fromJS(action.payload))
      .set('loggedIn', true)
  },
  [actions.hideError] (state) {
    return state.set('error', null)
  },
  [actions.logout] () {
    return Immutable.fromJS({
      data: {},
      loading: false,
      loaded: false,
      error: null,
      loggedIn: false
    })
  }
}, initialState)
