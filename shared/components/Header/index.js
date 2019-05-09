import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/auth'
import { Icon, Menu } from 'antd'
import style from './style.less'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

@connect(
  state => ({
    me: state.me
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)

export default class Header extends Component {

  toggle = () => {
    this.props.toggle(!this.props.collapsed);
  }

  render () {
    const { collapsed } = this.props
    return (
      <header className={style.layoutHeader}>
        <Icon className={style.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
        <Menu mode="horizontal" onClick={this.logout} className={style.layoutHeaderMenu}>
          <SubMenu title={<span><Icon type="user" />sosout</span>}>
            <MenuItem key="logout" onClick={() => actions.logout()}>注销</MenuItem>
          </SubMenu>
        </Menu>
      </header>
    )
  }
}
