/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory, Link } from 'react-router'
import { Menu, Icon } from 'antd'
import { menuConfig } from 'constants/menuList'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

@connect(
  state => ({
    pathname: state.routing.locationBeforeTransitions.pathname,
    me: state.me
  }),
  dispatch => ({
    actions: bindActionCreators({
    }, dispatch),
  })
)
export default class SidebarNav extends React.Component {

  menuTree(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.content} key={item.id} style={{ color: '#fff' }}>
            {this.menuTree(item.children)}
          </SubMenu>
        )
      }
      return <MenuItem title={item.content} key={item.id}>
        <Link to={item.path}>
          <Icon type={item.icon} />
          <span>{item.content}</span>
          </Link>
      </MenuItem>
    })
  }

  render() {
    const { mode } = this.props
      return (
          <Menu
            theme="dark"
            mode={mode}
          >
            {this.menuTree(menuConfig)}
          </Menu>
      )
  }
}
