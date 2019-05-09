export const loginMsg = { // 提示信息
  usernameInput: '请输入用户名',
  usernameEng: '用户名必须是字母',
  passwordInput: '请输入密码',
  loginError: '用户名或者密码错误!',
  /**
   * 只能输入英文
   *
   * @param {any} str
   * @returns
   */
  checkEng(str) {
    var reg = new RegExp(/^[A-Za-z]+$/);
    return str && reg.test(str);
  },
}
