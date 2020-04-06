import Vue from 'vue'
import Router from 'vue-router'
import IndexView from '~/renderer/views/index.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    }
  ]
})

export default router