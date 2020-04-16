<template>
  <div class="win-tools" v-bind:class="blurStyle" v-if="isMacos">
    <a class="win-tools-close" @click="handleClose"></a>
    <a class="win-tools-min" @click="minimize" :disabled="minimizeDisabled"></a>
    <a class="win-tools-full" @click="fullscreen"></a>
  </div>
  <div class="win-tools-right" v-else>
    <a class="iconfont icon-minimize1" @click="minimize"></a>
    <a class="iconfont" @click="maximize" v-bind:class="maximizeStyle"></a>
    <a class="iconfont icon-close" @click="handleClose"></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Watch } from 'vue-property-decorator'

@Component<WinTools>({
  name: 'win-tools',
  created () {
    if (this.isMacos) {
      this.$electron.ipcRenderer.on('blurWindow', (evt, agrs) => {
        this.blurStyle = 'blur'
      })
      this.$electron.ipcRenderer.on('focusWindow', (evt, agrs) => {
        this.blurStyle = ''
      })
      this.$electron.ipcRenderer.on('enterfullscreenWindow', (evt, agrs) => {
        this.minimizeDisabled = true
      })
      this.$electron.ipcRenderer.on('leavefullscreenWindow', (evt, agrs) => {
        this.minimizeDisabled = false
      })
    }
  }
})
export default class WinTools extends Vue {

  @Prop({ default: false }) isMacos!: boolean 
  @Prop({ default: false }) ismaximize!: boolean
  @Prop({ default: 'quit' }) closeMode!: 'hide' | 'quit'

  @Provide() blurStyle: string = ''
  @Provide() maximizeStyle: string = 'icon-square'
  @Provide() minimizeDisabled: boolean = false

  @Watch('ismaximize')
  onChangeIsmaximize (ismaximize: boolean, oldVal: boolean): void {
    this.maximizeStyle = ismaximize ? 'icon-16gl-minimize2' : 'icon-square'
  }

  /**
   * 关闭窗口
   */
  handleClose () {
    this.$electron.ipcRenderer.send('win-tools', this.closeMode)
  }

  /**
   * 窗口最小化
   */
  minimize () {
    let win = this.$electron.remote.getCurrentWindow()
    win.minimize()
  }

  /**
   * 窗口最大化
   */
  maximize () {
    let win = this.$electron.remote.getCurrentWindow()
    if (win.isMaximized()) {
      win.unmaximize()
    }
    else {
      win.maximize()
    }
  }

  /**
   * 窗口全屏化
   */
  fullscreen () {
    let win = this.$electron.remote.getCurrentWindow()
    let isFullscreen = win.isFullScreen()
    win.setFullScreen(!isFullscreen)
  }
  
}
</script>

<style lang="scss" scoped>
.win-tools {
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 4px 4px 4px 8px;
  -webkit-app-region: no-drag;

  a {
    display: block;
    width: 14px;
    height: 14px;
    background-size: 14px 14px!important;
    cursor: default;
    margin: 2px;

    &.win-tools-close {
      background: url('./images/traffic-close@2x.png');
    }

    &.win-tools-min {
      background: url('./images/traffic-minimise@2x.png');
    }

    &.win-tools-full {
      background: url('./images/traffic-fullscreen@2x.png');
    }
  }

  &.blur a, a[disabled] {
    background: url('./images/traffic-disabled@2x.png');
  }

  &:hover {
    .win-tools-close {
      background: url('./images/traffic-close-hover@2x.png');
    }

    .win-tools-min {
      background: url('./images/traffic-minimise-hover@2x.png');
    }

    .win-tools-full {
      background: url('./images/traffic-fullscreen-hover@2x.png');
    }

    a[disabled] {
      background: url('./images/traffic-disabled@2x.png');
    }
  }

  &:active {
    .win-tools-close {
      background: url('./images/traffic-close-down@2x.png');
    }

    .win-tools-min {
      background: url('./images/traffic-minimise-down@2x.png');
    }

    .win-tools-full {
      background: url('./images/traffic-fullscreen-down@2x.png');
    }
  }
}

.win-tools-right {
  display: flex;
  align-items: flex-end;
  padding: 6px;
  -webkit-app-region: no-drag;

  a {
    color: #666666;
    font-size: 20px;
    padding: 2px;
    display: block;
    cursor: default;

    &:hover {
      color: #111111;
    }
  }
}
</style>