<template>
  <fragment>
    <header ref="theHeader">
      <topbar-logo :is-macos="platform === 'darwin'">
        
      </topbar-logo>
      <div class="topbar-main" v-bind:class="platform === 'darwin' ? '' : 'topbar-main__win'">
        <div class="topbar-main__left" @dblclick="handleDbclick" :style="platform != 'darwin' ? 'padding-left:0' : ''">
          <template v-if="platform === 'darwin'">
            <span>{{ $route.meta.title || '' }}</span>
          </template>
          <template v-else>
            <win-controls :is-macos="platform === 'darwin'" />
          </template>
        </div>
        <div style="display:flex;align-items:center">
          <router-link class="iconfont icon-setting" to="/setting"></router-link>
          <!-- 打开/关闭 信件 -->
          <a class="iconfont icon-email" @click="handleEmail" v-bind:class="visibleEmail ? 'router-link-exact-active' : ''"></a>
          
          <!-- 选择主题 -->
          <el-popover placement="bottom" width="200" trigger="click" @show="handleShowThemes" @hide="handleHideThemes">
            <win-themesetting v-model="themeName" />
            <el-button type="text" class="iconfont icon-skin" slot="reference" v-bind:class="selectThemeStyle"></el-button>
          </el-popover>
          <!-- 自定义 Window 窗口 -->
          <win-tools v-if="platform != 'darwin'"
            :is-macos="platform === 'darwin'" 
            :ismaximize="ismaximize"
            />
        </div>
      </div>
    </header>
    
    <el-container ref="theContainer">
      <el-aside :width="siderWidth + 'px'" ref="theAside">
        <perfect-scrollbar>
          <div>
            start<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            ...<br>
            end
          </div>
        </perfect-scrollbar>
        <div ref="handle" class="split-handle"></div>
      </el-aside>
      <el-main ref="theMain">
        <perfect-scrollbar>
          <div style="padding:20px">
            <transition  name="fade" mode="out-in">
              <router-view />
            </transition>
          </div>
          <!-- <div></div> -->
        </perfect-scrollbar>
      </el-main>
      <mail-drawer :visible="visibleEmail" @close="handleCloseEmail" ref="theMailDrawer" />
    </el-container>
    <footer>

    </footer>
  </fragment>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import TopbarLogo from '~/renderer/components/topbar/logo.vue'
import { remote, ipcRenderer } from 'electron'
import { oc } from 'ts-optchain'
import throttle from 'lodash/throttle'
import * as setting from '~/renderer/store/modules/setting'
import { settingTypes, Setting } from '~/renderer/utils/vuex'

const SIDER_WIDTH_DEFAULT: number = 200
const SIDER_WIDTH_MAX: number = 400

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
    this.themeName = this.theme
    this.meta = this.$route.meta
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize, true)

    this.handleResizeSide()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize, false)
  }
})
export default class BasicLayout extends Vue {

  @Setting.State theme!: string

  @Provide() platform: string = this.$electron.remote.process.platform
  @Provide() ismaximize: boolean = false
  @Provide() siderWidth: number = SIDER_WIDTH_DEFAULT
  @Provide() mouse = { isDown: false, startX: 0 }
  @Provide() themeName: string = 'auto'
  @Provide() visibleEmail: boolean = false
  @Provide() selectThemeStyle: string = ''
  @Provide() meta: any = {}

  @Watch('themeName')
  onChangeTheme (theme: string): void {
    this.$store.commit(settingTypes.SETHEME, theme)
  }

  // @Watch()

  handleShowThemes () {
    this.selectThemeStyle = 'showopen'
  }

  handleHideThemes () {
    this.selectThemeStyle = ''
  }

  handleEmail () {
    this.visibleEmail = !this.visibleEmail
  }

  handleCloseEmail () {
    this.visibleEmail = false
  }

  handleResize () {
    let { theAside, theMain, theMailDrawer } = this.$refs as Record<string, Vue>
    setContainerHeight(theAside.$el)
    setContainerHeight(theMain.$el)
    setContainerHeight(theMailDrawer.$el, theMain.$el.clientHeight - 55)
  }

  handleResizeSide () {
    let dragging: boolean = false
    let clickX: number
    let leftOffset: number
    let handle = this.$refs['handle'] as HTMLElement
    let container = this.$refs['theContainer']['$el'] as HTMLElement

    handle.onmousedown = e => {
      dragging = true
      leftOffset = container.offsetLeft + 20
    }

    document.onmousemove = e => {
      if (!dragging) return
      clickX = e.pageX
      if (!(clickX > SIDER_WIDTH_DEFAULT && clickX < SIDER_WIDTH_MAX)) {
        return
      }
      this.siderWidth = clickX
    }

    document.onmouseup = e => {
      dragging = false
      e.cancelBubble = true
    }
    
  }

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

function setContainerHeight (ele: Element, height?: number): void {
  try {
    let ps : HTMLElement = ele.querySelector('.ps') as HTMLElement // ele.$children[0]['ps'].element
    ps.style.height = (height || ele.clientHeight) + 'px'
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" >
@import '~/renderer/assets/scss/_themeify.scss';
header {
  height: 58px;
  padding: 0;
  -webkit-app-region: drag;
  display: flex;
  // border-bottom: 1px #ccc solid;
  @include background-color('bg-color-header');
  transition: all .5s;



  .topbar-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 0;

    .topbar-main__left {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 30px;

      span {
        @include font-color('font-color-head');
        font-size: 14px;
        font-weight: 500;
      }
    }

    a.iconfont, span>.iconfont {
      padding: 4px;
      display: block;
      cursor: default;
      margin: 4px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 20px;
      text-decoration: none;
      text-align: center;
      @include font-color('font-color-head-link');
      -webkit-font-smoothing: antialiased;

      &.icon-email {
        font-size: 20px;
      }

      &:last-child {
        margin-right: 12px;
      }

      &:hover {
        @include font-color('font-color-head-link-hover');
        @include background-color('bg-color-header-iconhover');
      }

      &.router-link-exact-active {
        @include font-color('font-color-head-link-active');
      }
    }

    span>.iconfont {
      @include font-color('font-color-head-link');
      width: 28px;
      height: 28px;
      font-size: 18px;
      padding: 2px 4px;

      &:hover {
        @include font-color('font-color-head-link-hover');
      }

      &.showopen {
        @include font-color('font-color-head-link-active');
        @include background-color('bg-color-header-iconhover');
      }
    }

    &.topbar-main__win {

      a.iconfont, span>.iconfont {
        &:hover {
          background-color: transparent !important;
        }
      }
        
    }
  }
}

.el-container {
  height: inherit;
  overflow: hidden;
  position: relative;

  .el-aside {
    position: relative;
    overflow: hidden;
    @include background-color('bg-color-aside');
    
    .split-handle {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 5px;
      cursor: col-resize;
    }
  }

  .el-main {
    padding: 0;
    overflow: hidden;

  }

  .el-drawer__wrapper {
    position: absolute;
    pointer-events: none;
  }
}

footer {
  height: 65px;
  // background: #0000001a;
  border-top: 1px transparent solid;
  @include background-color('bg-color-footer');
  @include themeify {
    border-color: themed('border-color-footer')!important;
  }
}



.el-popper {
  @include background-color('bg-color-popover');
  border: 0px !important;

  .popper__arrow {
    @include themeify {
      border-bottom-color: themed('bg-color-popover')!important;
    }
    &::after {
      @include themeify {
        border-bottom-color: themed('bg-color-popover')!important;
      }
    }
  }
}

</style>