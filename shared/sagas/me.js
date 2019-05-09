/* eslint-disable */
import { takeEvery, delay } from 'redux-saga'
import { fork, call, put, select } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { routeChangeLoadDataList } from 'sagas/router'
import { resultState, statusState } from 'constants/baseState'
import * as actions from 'actions/me'
import * as api from 'utils/api'

function* getAccountInfo(action) {
  try {
    // const result = yield call(api.getAccountInfo, action.payload)
    yield put(actions.getAccountInfoSucceed(result))
  } catch(e) {
    // yield put(actions.getAccountInfoFailed(e.message))
    const result = {authorities: ["UPDATE_OTHERS_KYC_INFO", "READ_OTHERS_KYC_INFO", "ROLE_CUSTOMER_SERVICE","READ_OTHERS_BASIC_PROFILE"],
      registrationTime: 1524063573000,
      roles: ["ADMIN"],
      userId: "1005",
      username: "shenjun"
    }
    yield put(actions.getAccountInfoSucceed(result))
  }
}

function* getAccountInfoSucceed() {
  browserHistory.replace('/')
}

function* getAccountInfoFailed() {
  browserHistory.replace('/login')
}

function* changePw(action) {
  try {
    yield call(api.changepw, action.payload)
    yield put(actions.changePwSucceed())
  } catch (e) {
    yield put(actions.changePwFailed(e))
  }
}

function* changePwSucceed() {
  yield delay(2000)
  yield put(actions.resetState({ type: 'changePw', value: statusState }))
}

function* changePwFailed() {
  yield delay(3000)
  yield put(actions.resetState({ type: 'changePw', value: statusState }))
}

export default function* meSaga () {
  yield fork(takeEvery, String(actions.getAccountInfoRequested), getAccountInfo)
  yield fork(takeEvery, String(actions.getAccountInfoSucceed), getAccountInfoSucceed)
  yield fork(takeEvery, String(actions.getAccountInfoFailed), getAccountInfoFailed)

  yield fork(takeEvery, String(actions.changePwRequested), changePw)
  yield fork(takeEvery, String(actions.changePwSucceed), changePwSucceed)
  yield fork(takeEvery, String(actions.changePwFailed), changePwFailed)
}
