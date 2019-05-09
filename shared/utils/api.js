/* eslint-disable */
import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'
import { COOKIE_TOKEN_KEY } from 'constants/index'
import { GATEWAY_API_URL } from 'constants/env'

/**
 *  Created By ChrisWen
 *  2018/12/18
 *  处理文件下载的通用函数
 *  返回一个数组。
 *  [error,data]
 */
export const fetchFile = (method = 'GET', endPoint = '/hello', params = {}, customeHeaders = {}) => {
  let url = GATEWAY_API_URL + endPoint
  const token = cookie.load(COOKIE_TOKEN_KEY) ? `Bearer ${cookie.load(COOKIE_TOKEN_KEY)}` : null

  const headers = Object.assign({
    Accept: '*', // 'application/json'
    'Content-Type': 'application/json',
    Authorization: token,
  }, customeHeaders)

  const options = { method, headers }
  const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
  url += queryString

  const lastCharacter = url.substr(-1, 1)
  if (lastCharacter === '?') { url = url.substring(0, url.length - 1) }

  return fetch(url, options).then(res => res.blob()).then(blob => [null, blob]).catch(error => [error, null]);
}

export const fetchBase = (method = 'GET', endPoint = '/hello', params = {}, customeHeaders = {}) => {
  let url = GATEWAY_API_URL + endPoint
  const token = cookie.load(COOKIE_TOKEN_KEY) ? `Bearer ${cookie.load(COOKIE_TOKEN_KEY)}` : null

  const headers = Object.assign({
    Accept: '*', // 'application/json'
    'Content-Type': 'application/json',
    Authorization: token,
  }, customeHeaders)

  const options = { method, headers }

  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
    url += queryString
  } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      options.body = `${Object.keys(params).map(k => [k, params[k]].join('=')).join('&')}`
    } else if (headers['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type']
      const formData = new FormData()
      Object.keys(params).forEach(key => formData.append(key, params[key]))
      options.body = formData
    } else {
      options.body = JSON.stringify(params)
    }
  }

  const lastCharacter = url.substr(-1, 1)
  if (lastCharacter === '?') {
    url = url.substring(0, url.length - 1)
  }

  return fetch(url, options).then((res) => {
    if (res.status === 401) {
      if (window.location.href.indexOf('/login') < 0) {
        window.location.href = '/login'
        browserHistory.push('/login')
      }
    }

    const contentType = res.headers.get('content-type')

    if (!res.ok) {
      if (/text/.test(contentType)) {
        return res.text().then(e => Promise.reject({ message: e }))
      }

      return res.json().then(e => Promise.reject({ message: e.message }))
    }

    if (/json/.test(contentType)) {
      return res.json().then((values) => {
        return values
      })
    }

    if (/excel/.test(contentType)) {
      return res.blob().then(v => v)
    }

    if (/text/.test(contentType)) {
      return res.text().then(v => v)
    }

    return null
  })
}

export const oauth = params => fetchBase('POST', '/uaa/oauth/token', params, {
  Authorization: 'Basic YnJvd3Nlcjo=',
  'Content-Type': 'application/x-www-form-urlencoded'
})

export const authLogin = (params) => fetchBase('POST', '/login', params)

export const validateToken = params => fetchBase('GET', '/uaa/oauth/check_token', params, { Authorization: 'Basic YnJvd3Nlcjo=' })

export const getAccountInfo = () => fetchBase('GET', '/profile')

export const getOneUser = ({ userId, ...params }) => fetchBase('GET', `/users/${userId}`, params)

// change password
export const changepw = (params) => fetchBase('PUT', '/profile/password', params)

// image
export const uploadImage = params => fetchBase('POST', `/imageUpload/${params.type}`, { file: params.content }, { 'Content-Type': 'multipart/form-data' })
//account
export const accountSearch = (params) => fetchBase('GET', '/users', params)
// change password
export const chagnePassword = (params) => fetchBase('PUT', '/profile/password', params)

//渠道商crm 业务逻辑api
// TODO

