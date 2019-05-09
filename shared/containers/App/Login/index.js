import React, { Component } from 'react'

import LoginForm from './LoginForm'
import style from './style.less'

export default class Login extends Component {
  render () {
    return (
      <div className={style.login}>
          <LoginForm />
      </div>
    )
  }
}
