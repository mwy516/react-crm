import { createAction } from 'redux-actions'

export const resetState = createAction('me/RESET_STATE')

export const getAccountInfoRequested = createAction('me/GET_ACCOUNT_INFO_REQUESTED')
export const getAccountInfoSucceed = createAction('me/GET_ACCOUNT_INFO_SUCCEED')
export const getAccountInfoFailed = createAction('me/GET_ACCOUNT_INFO_FAILED')

export const changePwRequested = createAction('me/CHANGE_PASSWORD_REQUESTED')
export const changePwSucceed = createAction('me/CHANGE_PASSWORD_SUCCEED')
export const changePwFailed = createAction('me/CHANGE_PASSWORD_FAILED')
export const hideChangePwError = createAction('me/HIDE_CHANGE_PASSWORD_FAILED')

export const clearInfo = createAction('me/CLEAR_ME_INFO')
