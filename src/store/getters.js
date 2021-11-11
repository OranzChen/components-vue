const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  sessionData: state => state.user.sessionData,
  asyncRouterMap: state => state.user.asyncRouterMap,
  // permissionRoutes: state => state.permission.routes,
  name: state => state.user.name,
  userName: state => state.user.userName
}
export default getters
