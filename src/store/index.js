import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import globalConstant from './modules/globalConstant'
import user from './modules/user'
// import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    globalConstant,
    user
  },
  getters
})

export default store
