import Vue from 'vue'
import Fragment from 'vue-fragment'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import '~/renderer/assets/scss/perfect-scrollbar.scss'

Vue.use(Fragment.Plugin)
Vue.use(PerfectScrollbar)

import WinTools from '~/renderer/components/win-tools'
import WinControls from '~/renderer/components/topbar/controls.vue'
import WinThemeSetting from '~/renderer/components/topbar/theme-setting.vue'
import MainDrawer from '~/renderer/components/drawer/index.vue'

Vue.component('win-tools', WinTools)
Vue.component('win-controls', WinControls)
Vue.component('win-themesetting', WinThemeSetting)
Vue.component('main-drawer', MainDrawer)