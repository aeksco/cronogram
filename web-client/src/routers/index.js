import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import HomeRoutes from '@/modules/home/router'
import AuthRoutes from '@/modules/auth/router'
import UserRoutes from '@/modules/user/router'
import TaskRoutes from '@/modules/task/router'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    ...HomeRoutes,
    ...AuthRoutes,
    ...UserRoutes,
    ...TaskRoutes
  ]
})
