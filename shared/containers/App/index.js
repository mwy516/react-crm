/* eslint-disable */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import SidebarNav from 'components/SidebarNav'
import Header from 'components/Header'
import Footer from 'components/Footer'
import * as routerActions from 'actions/router'
import * as intlActions from 'actions/intl'
import style from './style.less'
import { Layout } from 'antd'
const { Sider, Content } = Layout;

@connect(
  state => ({
    path: state.routing.locationBeforeTransitions.pathname
  }),
  dispatch => ({
    actions: bindActionCreators({
      ...routerActions,
      ...intlActions
    }, dispatch)
  })
)
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      mode: 'inline'
    };
  }
  componentDidMount() {
    this.props.actions.locationInit(this.props.location)
  }

  toggle = (collapsed) => {
    this.setState({
      collapsed: collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    });
  }

  renderApp() {
    if (['/login'].includes(this.props.path)) {
      return <div>{this.props.children}</div>
    }
    const { collapsed, mode } = this.state
    return (
        <Layout className={style.layout}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.toggle}>
            <div className={style.layoutLogo}>
              <Link to="/">
                <span className={style.logoText}>ANTD ADMIN</span>
              </Link>
            </div>
            <SidebarNav mode={ mode } />
          </Sider>
          <Layout>
            <Header collapsed={collapsed} toggle={ collapsed => this.toggle(collapsed) } />
            <Content className={style.layoutContent}>
              {this.props.children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
    )
  }

  render () {
    return (
      <div>
        {::this.renderApp()}
      </div>
    )
  }
}
