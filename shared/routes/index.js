import App from 'containers/App'

export const errorLoading = err => console.error('Dynamic page loading failed', err)

const loadRoute = cb => (module) => {
  cb(null, module.default)
}

const loadIndexRoute = cb => (module) => {
  cb(null, { component: module.default })
}

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb){
        import('containers/App/basicData')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'login',
      getIndexRoute(location, cb) {
        import('containers/App/Login')
          .then(loadIndexRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'basicDataColumn',
      getComponent(location, cb){
        import('containers/App/basicData')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
  ]
}

export default routes
