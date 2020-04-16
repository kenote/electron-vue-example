<template>
  <fragment>
    <header ref="theHeader" @dblclick="handleDbclick">
      <topbar-logo :is-macos="platform === 'darwin'">

      </topbar-logo>
      <div class="topbar-main">
        <div></div>
        <win-tools v-if="platform != 'darwin'"
          :is-macos="platform === 'darwin'" 
          :ismaximize="ismaximize"
          />
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </fragment>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import TopbarLogo from '~/renderer/components/topbar/logo.vue'
import { remote, ipcRenderer } from 'electron'

@Component<BasicLayout>({
  name: 'basic-layout',
  components: {
    TopbarLogo,
  },
  created () {
    this.$electron.ipcRenderer.on('maximizeWindow', (evt, agrs) => {
      this.ismaximize = true
    })
    this.$electron.ipcRenderer.on('unmaximizeWindow', (evt, agrs) => {
      this.ismaximize = false
    })
  }
})
export default class BasicLayout extends Vue {

  @Provide() platform: string = this.$electron.remote.process.platform
  @Provide() ismaximize: boolean = false

  handleDbclick () {
    let win = this.$electron.remote.getCurrentWindow()
    if (win.isMaximized()) {
      win.unmaximize()
    }
    else {
      win.maximize()
    }
  }
  
}
</script>

<style lang="scss">
header {
  height: 50px;
  -webkit-app-region: drag;
  display: flex;
  border-bottom: 1px #ccc solid;
  background: #0000001a;


  .topbar-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 0;
  }
}
</style>