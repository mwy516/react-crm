import { takeEvery } from 'redux-saga'
import { fork, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import * as routerActions from 'actions/router'
import * as authActions from 'actions/auth'
import { COOKIE_TOKEN_KEY } from 'constants/index'
import cookie from 'react-cookie'

function* locationInit(action) {
  const { pathname } = action.payload
  const token = cookie.load(COOKIE_TOKEN_KEY)
  if (token) {
    yield put(authActions.validateTokenRequested({ token }))
  } else if (pathname !== '/login') {
    browserHistory.replace('/login')
  }
}

export default function* routerSaga() {
  yield fork(takeEvery, String(routerActions.locationInit), locationInit)
}
