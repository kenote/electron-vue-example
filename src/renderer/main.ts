import Vue, { CreateElement } from 'vue'
import VueElectron from 'vue-electron'
import App from '~/renderer/App.vue'
import store from '~/renderer/store'
import router from '~/renderer/router'

Vue.config.productionTip = false
Vue.use(VueElectron)

new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App)
}).$mount('#app')