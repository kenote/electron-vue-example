import Vue from 'vue'
import Fragment from 'vue-fragment'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import '~/renderer/assets/scss/perfect-scrollbar.scss'

Vue.use(Fragment.Plugin)
Vue.use(PerfectScrollbar)

import WinTools from '~/renderer/components/win-tools'
import WinControls from '~/renderer/components/topbar/controls.vue'
import WinThemeSetting from '~/renderer/components/topbar/theme-setting.vue'
import WinDrawer from '~/renderer/components/drawer/index.vue'
import MailDrawer from '~/renderer/components/drawer/mail.vue'

Vue.component('win-tools', WinTools)
Vue.component('win-controls', WinControls)
Vue.component('win-themesetting', WinThemeSetting)
Vue.component('win-drawer', WinDrawer)
Vue.component('mail-drawer', MailDrawer)