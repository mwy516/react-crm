import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import cookie from 'react-cookie'
import { COOKIE_LANG_KEY } from 'constants/index'
import { switchDomain } from 'utils/domain'
import * as actions from 'actions/intl'

function* setLang(action) {
  yield cookie.save(COOKIE_LANG_KEY, action.payload, {
    path: '/',
    //domain: switchDomain(process.env.APP_ENV),
    expires: new Date(Date.now() + (3600 * 1000 * 24 * 365))
  })
}

export default function* intlSaga () {
  yield fork(takeEvery, String(actions.setLocale), setLang)
}
