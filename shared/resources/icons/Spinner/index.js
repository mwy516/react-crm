/* @jsx */

import React from 'react'
import classNames from 'classnames'
import style from './style.css'

const Spinner = ({ space = false }) => (
  <div
    className={classNames({
      [style.spinner]: true,
      [style.spinnerSpace]: space === true
    })}
  />
)

export default Spinner
