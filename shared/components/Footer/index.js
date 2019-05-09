import React, { Component } from 'react'
import style from './style.less'

export default class Footer extends Component {

  render () {
    return (
      <footer className={style.layoutFooter}>
        Ant Design Admin 版权所有 © 2019 由 admin 支持
      </footer>
    )
  }
}
