<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './assets/scss/main.scss'

@Component<App>({
  
  created () {
    
    this.$store.commit('setting/SETNAME', 'ppp')
    console.log(this.$electron, this.$store)
    // let win = this.$electron.remote.getCurrentWindow()
    // win.maximize()
    // let isFullscreen = win.isFullScreen()
    // win.setFullScreen(!isFullscreen)
    // this.$electron.ipcRenderer.send('win-tools', 'hide')
    
  }
})
export default class App extends Vue {
  
}
</script>

<style lang="scss">
</style>