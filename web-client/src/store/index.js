import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/modules/auth/store'
import notification from '@/modules/notification/store'
import user from '@/modules/user/store'
import task from '@/modules/task/store'

// Vuex Initialization
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notification,
    user,
    task
  }
})
