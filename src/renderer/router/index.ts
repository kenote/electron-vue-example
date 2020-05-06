import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '~/renderer/layouts/basic.vue'
import settingRoutes from './modules/setting'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      // name: 'index',
      component: BasicLayout,
      // redirect: '/home',
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('~/renderer/views/index.vue')
        },
        ...settingRoutes
      ]
    },
    // ...settingRoutes
  ]
})

export default router