import Immutable from 'immutable'
import cookie from 'react-cookie'
import { COOKIE_LANG_KEY } from 'constants/index'

export const getInitialLang = () => Immutable.fromJS({
  locale: cookie.load(COOKIE_LANG_KEY) || 'zh'
})
