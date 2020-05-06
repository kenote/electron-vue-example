<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserProxy } from '@/types/proxys/user'
import { setTheme } from '~/renderer/utils'
import { settingTypes, Setting } from '~/renderer/utils/vuex'
import '~/renderer/assets/iconfont/iconfont.css'
import './assets/scss/main.scss'

@Component<App>({
  
  created () {
    this.updateOnlineStatus()
    window.addEventListener('online', this.updateOnlineStatus, true)
    window.addEventListener('offline', this.updateOnlineStatus, true)
    this.$electron.ipcRenderer.on('online-status', (evt, args) => {
      console.log('online-status', args)
    })
    // 监听系统切换暗色主题
    this.$electron.ipcRenderer.on('systemDarkMode', (evt, isDarkMode) => {
      setTheme(this.theme, isDarkMode)
    })
  },
  mounted () {
    setTheme(this.theme)
  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus, false)
    window.removeEventListener('offline', this.updateOnlineStatus, false)
  }
})
export default class App extends Vue {

  @Setting.State theme!: string

  @Watch('theme')
  onChangeTheme (theme: string): void {
    setTheme(theme)
  }
  
  updateOnlineStatus () {
    this.$electron.ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }
}
</script>

<style lang="scss">
@import '~/renderer/assets/scss/_themeify.scss';
#app {
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  @include background-color('bg-color-main');
}
</style>