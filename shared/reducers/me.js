import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import * as actions from 'actions/me'

const initialState = Immutable.fromJS({
  data: null,
  loading: false,
  loaded: false,
  error: null,
  changePw: {
    success: false,
    loading: false,
    loaded: false,
    error: null,
  }
})

export default handleActions({
  [actions.resetState](state, action) {
    return state.set(action.payload.type, Immutable.fromJS(action.payload.value))
  },
  [actions.getAccountInfoRequested] (state) {
    return state.set('loaded', false)
      .set('data', null)
      .set('error', null)
      .set('loading', true)
  },
  [actions.getAccountInfoSucceed] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('error', null)
      .set('data', Immutable.fromJS(action.payload))
  },
  [actions.getAccountInfoFailed] (state, action) {
    return state.set('loading', false)
      .set('loaded', true)
      .set('data', null)
      .set('error', action.payload)
  },
  [actions.changePwRequested] (state) {
    return state.update('changePw', v => v.set('loading', true).set('loaded', false).set('error', null)
    )
  },
  [actions.changePwSucceed] (state) {
    return state.update('changePw', v => v.set('loading', false).set('loaded', true).set('success', true))
  },
  [actions.changePwFailed] (state, action) {
    return state.update('changePw', v => v.set('loading', false).set('loaded', true).set('error', action.payload)
    )
  },
  [actions.hideChangePwError] (state) {
    return state.update('changePw', v => v.set('showError', false))
  },
  [actions.clearInfo] () {
    return Immutable.fromJS({
      data: null,
      loading: false,
      loaded: false,
      error: null,
      changePw: {
        success: false,
        loading: false,
        loaded: false,
        error: null
      }
    })
  }
}, initialState)
