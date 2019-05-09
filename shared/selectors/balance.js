import Immutable from 'immutable'
import cookie from 'react-cookie'

const getInitialOption = (type) => {
  if (typeof cookie.load(type) === 'undefined') return true
  return cookie.load(type)
}

export const getInitialBalance = () => Immutable.fromJS({
  data: {},
  loading: false,
  loaded: false,
  error: null,
  showCNYBalance: getInitialOption('showCNYBalance'),
  showBTCBalance: getInitialOption('showBTCBalance'),
  showLTCBalance: getInitialOption('showLTCBalance'),
  showBalanceInMobile: false
})
