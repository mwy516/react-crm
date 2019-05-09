/* eslint-disable */
import { takeEvery} from 'redux-saga'
import { fork, call, put } from 'redux-saga/effects'
import * as actions from 'actions/jobBus'
import * as api from 'utils/api'


//基础数据--所有币种
function* getBasicDataOfAll(action) {
  try {
    const result = yield call(api.validateToken, action.payload)
    yield put(actions.getBasicDataOfAllSucceeded(result))
  } catch (e) {
    yield put(actions.getBasicDataOfAllFailed(e.message))
  }
}

//基础数据--单个币种
function* getBasicDataByOneCurrency(action) {
    try {
      const result = yield call(api.validateToken, action.payload)
      yield put(actions.getBasicDataByOneCurrencySucceeded(result))
    } catch (e) {
      yield put(actions.getBasicDataByOneCurrencyFailed(e.message))
    }
  }

export default function* jobBusSaga () {
  yield fork(takeEvery, String(actions.getBasicDataOfAllRequested), getBasicDataOfAll)
  yield fork(takeEvery, String(actions.getBasicDataByOneCurrencyRequested), getBasicDataByOneCurrency)
}
