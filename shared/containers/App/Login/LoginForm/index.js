import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'actions/auth'
import style from './style.less'
import { loginMsg } from 'constants/login'
import { Spin, Form, Input, Button } from 'antd';
const FormItem = Form.Item;

@connect(
  state => ({
    auth: state.auth.toJS()
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleSubmit = (e) => { // 登录
    e.preventDefault();
    const { actions, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        actions.loginRequested({
          username: values.username,
          password: values.password,
          scope: 'ui',
          grant_type: 'password'
        })
      }
    });
  }
  // 验证用户名
  checkUsername = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!loginMsg.checkEng(value)) {
      callback(loginMsg.usernameEng);
    } else {
      callback();
    }
  }
  // 验证密码
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render () {
    const { loading } = this.props.auth
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.form}>
        <Spin tip="载入中..." spinning={loading}>
          <div className={style.logo}>
            <span>Ant Design</span>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem hasFeedback>
              {getFieldDecorator('username', { rules: [{ required: true, message: loginMsg.usernameInput }, { validator: this.checkUsername }] })(
                <Input placeholder="用户名" />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', { rules: [{ required: true, message: loginMsg.passwordInput }, { validator: this.checkPassword }] })(
                <Input type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={loading}>{loading ? '登录中...' : '登录'}</Button>
            </FormItem>
            <div className={style.loginAccount}>
              <span>账号：admin</span>
              <span>密码：admin123</span>
            </div>
          </Form>
        </Spin>
      </div>
    )
  }
}
export default Form.create()(LoginForm);
