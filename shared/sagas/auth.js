/* eslint-disable */
import { takeEvery, delay } from 'redux-saga'
import { fork, call, put } from 'redux-saga/effects'
// import { change } from 'redux-form/es/immutable'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
import { message } from 'antd'
import { COOKIE_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from 'constants/index'
import { switchDomain } from 'utils/domain'
import * as actions from 'actions/auth'
import * as meActions from 'actions/me'
import * as api from 'utils/api'

function* login(action) {
  try {
    // const result = yield call(api.oauth, action.payload)
    // if (result.statusCode && result.statusCode !== 200) {
    //   yield put(actions.loginFailed(result))
    // } else {
    //   yield put(actions.oauthSucceeded(result))
    // }
    const result = {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTA5MzU4OTcsImlhdCI6MTU1MDg5MjY5NywidXNlcl9uYW1lIjoiMTAwNSIsImp0aSI6IjBlOGVjY2UwLTM1NGMtNDk2My1hOWExLTdmYmU3Mzg2ZTVhZiIsImNsaWVudF9pZCI6ImJyb3dzZXIiLCJzY29wZSI6WyJ1aSJdfQ.THt7FrgUaUcTk6nuDkI14m0szFoexJZ2KaFZWHqEHBs",
      expires_in: 43199,
      iat: 1550825115,
      jti: "def520cc-1744-4b2c-992c-233a2b223745",
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMDA1Iiwic2NvcGUiOlsidWkiXSwiYXRpIjoiNDExZDI4MGQtYTFmOS00NDlkLWJjNDYtYmI5ZDllODBjMDkxIiwiZXhwIjoxNTUzNDg0ODc3LCJpYXQiOjE1NTA4OTI4NzcsImp0aSI6IjdhZDI1Y2I1LTg3YjAtNGM2NC1hZTBjLTk2NjQ1ZWE4YjBmMSIsImNsaWVudF9pZCI6ImJyb3dzZXIifQ.QNxEqImLd_c3WV1MPh3iKw6d5Kiq7Wlq2nWEzezpchs",
      scope: "ui",
      token_type: "bearer"
    }
    yield put(actions.oauthSucceeded(result))
  } catch (e) {
    // message.error('登陆失败，请重试')
    // yield put(actions.loginFailed('登陆失败'))
    const result = {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTA5MzU4OTcsImlhdCI6MTU1MDg5MjY5NywidXNlcl9uYW1lIjoiMTAwNSIsImp0aSI6IjBlOGVjY2UwLTM1NGMtNDk2My1hOWExLTdmYmU3Mzg2ZTVhZiIsImNsaWVudF9pZCI6ImJyb3dzZXIiLCJzY29wZSI6WyJ1aSJdfQ.THt7FrgUaUcTk6nuDkI14m0szFoexJZ2KaFZWHqEHBs",
      expires_in: 43199,
      iat: 1550825115,
      jti: "def520cc-1744-4b2c-992c-233a2b223745",
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMDA1Iiwic2NvcGUiOlsidWkiXSwiYXRpIjoiNDExZDI4MGQtYTFmOS00NDlkLWJjNDYtYmI5ZDllODBjMDkxIiwiZXhwIjoxNTUzNDg0ODc3LCJpYXQiOjE1NTA4OTI4NzcsImp0aSI6IjdhZDI1Y2I1LTg3YjAtNGM2NC1hZTBjLTk2NjQ1ZWE4YjBmMSIsImNsaWVudF9pZCI6ImJyb3dzZXIifQ.QNxEqImLd_c3WV1MPh3iKw6d5Kiq7Wlq2nWEzezpchs",
      scope: "ui",
      token_type: "bearer"
    }
    yield put(actions.oauthSucceeded(result))
  }
}

function* oauth(action) {
  try {
    const result = yield call(api.oauth, action.payload)
    if (result.statusCode && result.statusCode !== 200) {
      yield put(actions.oauthFailed(result))
    } else {
      yield put(actions.oauthSucceeded(result))
    }
  } catch (e) {
    yield put(actions.oauthFailed(e.error))
  }
}

function* oauthSucceeded (action) {
  cookie.save(COOKIE_TOKEN_KEY, action.payload.access_token, {
    path: '/',
    //domain: switchDomain(process.env.APP_ENV),
    expires: new Date(Date.now() + ((+action.payload.expires_in) * 1000))
  })
  cookie.save(COOKIE_REFRESH_TOKEN_KEY, action.payload.refresh_token, {
    path: '/',
    //domain: switchDomain(process.env.APP_ENV),
    expires: new Date(Date.now() + ((+action.payload.expires_in) * 1000))
  })
  yield put(meActions.getAccountInfoRequested())
  yield delay((+action.payload.expires_in - 1) * 1000)
  // yield put(actions.oauthRequested({ refresh_token: action.payload.refresh_token, grant_type: 'refresh_token' }))
}

function* oauthFailed() {
  yield call(delay, 2000)
  yield put(actions.hideError())
  yield put(actions.logout())
}

function* loginFailed() {
  yield call(delay, 2000)
  yield put(actions.hideError())
}

function* logout() {
  cookie.remove(COOKIE_TOKEN_KEY, {
    path: '/',
    domain: switchDomain(process.env.APP_ENV)
  })
  cookie.remove(COOKIE_REFRESH_TOKEN_KEY, {
    path: '/',
    domain: switchDomain(process.env.APP_ENV)
  })
  yield put(meActions.clearInfo())
  browserHistory.push('/login')
}

function* validateToken(action) {
  try {
    const result = yield call(api.validateToken, action.payload)
    yield put(actions.validateTokenSucceeded(result))
  } catch (e) {
    yield put(actions.validateTokenFailed(e.message))
  }
}

function* validateTokenSucceeded() {
  yield put(meActions.getAccountInfoRequested())
}

function* validateTokenFailed() {
  yield put(actions.logout())
}

export default function* authSaga () {
  yield fork(takeEvery, String(actions.loginRequested), login)
  yield fork(takeEvery, String(actions.loginSucceeded), oauthSucceeded)
  yield fork(takeEvery, String(actions.loginFailed), loginFailed)
  yield fork(takeEvery, String(actions.oauthRequested), oauth)
  yield fork(takeEvery, String(actions.oauthSucceeded), oauthSucceeded)
  yield fork(takeEvery, String(actions.oauthFailed), oauthFailed)
  yield fork(takeEvery, String(actions.validateTokenRequested), validateToken)
  yield fork(takeEvery, String(actions.validateTokenSucceeded), validateTokenSucceeded)
  yield fork(takeEvery, String(actions.validateTokenFailed), validateTokenFailed)
  yield fork(takeEvery, String(actions.logout), logout)
}
