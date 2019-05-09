export const switchDomain = (env) => {
  switch (env) {
    case 'prod':
      return 'cg-back.com'
      // return 'cg-manage.com'
      // return 'coingame.com'
    case 'development':
      return window.location.host
    case 'pre':
      return window.location.host
    case 'staging':
      return window.location.host
    case 'test':
      return window.location.host
    case 'demo':
      return window.location.host
    default:
      return window.location.host
  }
}
