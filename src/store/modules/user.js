import { getMenuList, getSession } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { routerMap, notFoundRouter } from '@/router/routerMap'
import { routerDefault, noAuthRoutes } from '@/router'
import Layout from '@/layout'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

// 把后端返回的菜单组装成路由集合
function generaMenu(routers, data) {
  data.forEach((item) => {
    const menu = {
      path: item.url,
      redirect: !item.parentId ? item.url : '',

      component: !item.parentId ? Layout : resolve => require([`@/views${item.url}/index.vue`], resolve),
      children: [],
      name: item.key,
      hidden: !item.show,
      meta: { title: item.name, icon: item.icon, id: item.id }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routers.push(menu)
  })
}

// // 设置页面子路由
// function setChildrenRoute(routers, child, position) {
//   routers.forEach(item => {
//     if (item.name === position) {
//       // item.component = Layout
//       item.children.push(child)
//     }
//     if (item.children) {
//       setChildrenRoute(item.children, child, position)
//     }
//   })
// }

// // 相册模型子路由
// const modelVersionRouter = {
//   path: '/album/configModelVersion',
//   name: 'ConfigModelVersion',
//   component: () => import('@/views/album/configModelVersion/index.vue'),
//   meta: { title: '配置模型版本' },
//   hidden: true
// }


const state = {
  // token: getToken(),
  userName: '',
  sessionData: {},
  asyncRouterMap: []
}

const mutations = {
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_USERNAME: (state, userName) => {
  //   state.userName = userName
  // },
  SET_SESSIONDATA: (state, sessionData) => {
    state.sessionData = sessionData
  },
  SET_ASYNCROUTERMAP: (state, asyncRouterMap) => {
    // debugger
    // state.asyncRouterMap = routerDefault

    state.asyncRouterMap = asyncRouterMap
  }
}


const actions = {

  //   // 获取并格式化左侧菜单栏信息
  getMenuList({ commit, state }) {
    // debugger
    let allRouter
    allRouter = routerDefault
    // console.log(routerDefault)
    commit('SET_ASYNCROUTERMAP', allRouter)
    // commit('SET_ASYNCROUTERMAP', allRouter)
    // return new Promise((resolve, reject) => {
    //   const params = {
    //     proxyKey: '/proxy/zb'
    //   }
    //   getMenuList(params).then(res => {
    //     if (!res.data || res.data.length === 0) {
    //       Message.error('未授权用户无权访问，请登录系统或者升级权限')
    //       reject('未授权用户无权访问，请登录系统或者升级权限')
    //     }
    //     const menu = res.data || []
    //     const formatMenu = []
    //     const menuParentList = []
    //     const menuChildrenMap = {}
    //     menu.forEach(item => {
    //       if (item.url) {
    //         item.key = item.url.split('/').slice(-1)[0] || ''
    //       }
    //       if (!item.parentId) {
    //         menuParentList.push(item)
    //       } else {
    //         menuChildrenMap[item.parentId] || (menuChildrenMap[item.parentId] = [])
    //         menuChildrenMap[item.parentId].push(item)
    //       }
    //     })
    //     menuParentList.forEach(item => {
    //       if (menuChildrenMap[item.id]) {
    //         item.children = menuChildrenMap[item.id]
    //         formatMenu.push(item)
    //       }
    //     })
    //     const routers = []
    //     generaMenu(routers, formatMenu)
    //     commit('SET_ASYNCROUTERMAP', routers)
    //     const reset = {
    //       path: '/video',
    //       component: Layout,
    //       hidden: true,
    //       redirect: state.asyncRouterMap[0].children[0] ? state.asyncRouterMap[0].children[0].path : '/404'
    //     }
    //     state.asyncRouterMap.unshift(reset)

    // resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })

  },



  // get user info

  getSession({ commit, state }) {

    return new Promise((resolve, reject) => {
      getSession('proxyKey&\/proxy\/securitypatch').then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_SESSIONDATA', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

