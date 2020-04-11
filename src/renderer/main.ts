import Vue, { CreateElement } from 'vue'
import VueElectron from 'vue-electron'
import App from '~/renderer/App.vue'
import store from '~/renderer/store'
import router from '~/renderer/router'
import '~/renderer/plugins/component'
import '~/renderer/plugins/element-ui'
import * as dataStore from '~/renderer/datastore'

Vue.config.productionTip = false
Vue.use(VueElectron)

globalThis.isRenderer = true
Vue.prototype.$db = dataStore

new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App)
}).$mount('#app')