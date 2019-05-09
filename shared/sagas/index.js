import { fork } from 'redux-saga/effects'
import authLoginSaga from './auth'
import routerSaga from './router'
import intlSaga from './intl'
import meSaga from './me'
import jobBusSaga from './jobBusSaga'


const sagas = [
  fork(routerSaga),
  fork(authLoginSaga),
  fork(intlSaga),
  fork(meSaga),
  fork(jobBusSaga)
]


export default function* rootSaga () {
  yield sagas
}
