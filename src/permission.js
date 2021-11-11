import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { routerMap } from '@/router/routerMap'
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  next()
  if (store.getters.asyncRouterMap.length === 0) {
    try {
      // get user info
      // await store.dispatch('user/getSession')
      // await store.dispatch('user/getMenuList').then(data => {
      store.dispatch('user/getMenuList')
      router.addRoutes(store.getters.asyncRouterMap)
      // next({ ...to, replace: true })
      // })
      next()
    } catch (error) {
      // await store.dispatch('user/resetToken')
      // Message.error(error || 'Has Error')
      // next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  } else {
    /* has no token*/
    console.log(to.path)
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
