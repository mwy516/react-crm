import { createAction } from 'redux-actions'

export const loginRequested = createAction('auth/LOGIN_REQUESTED')
export const loginSucceeded = createAction('auth/LOGIN_SUCCEEDED')
export const loginFailed = createAction('auth/LOGIN_FAILED')

export const validateTokenRequested = createAction('auth/VALIDATE_TOKEN_REQUESTED')
export const validateTokenSucceeded = createAction('auth/VALIDATE_TOKEN_SUCCEEDED')
export const validateTokenFailed = createAction('auth/VALIDATE_TOKEN_FAILED')

export const hideError = createAction('auth/ERROR_HIDE')

export const logout = createAction('auth/LOGOUT')
