<template>
  <div class="win-drawer" v-bind:class="placement" :style="styles" v-show="visible" ref="theDrawer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component<WinDrawer>({
  name: 'win-drawer',
  created () {
    this.getStyles(this.width)
  },
  mounted () {
    

  }
})
export default class WinDrawer extends Vue {

  @Prop({ default: 'right' }) placement!: 'top' | 'bottom' | 'left' | 'right'
  @Prop({ default: 300 }) width!: number
  @Prop({ default: false }) visible!: boolean
  
  @Provide() styles: {} = { width: '300px' }

  @Watch('width')
  onChangeWidth (val: number): void {
    this.getStyles(val)
  }

  @Watch('visible')
  onChangeVisible (visible: boolean): void {
    if (visible) {
      document.addEventListener('click', this.handleClick, true)
    }
    else {
      document.removeEventListener('click', this.handleClick, false)
    }
  }

  handleClick (evt: MouseEvent) {
    let drawer = this.$refs['theDrawer'] as HTMLElement
    let eventPath: string[] = evt['path'].map( o => o.className)
    if (!eventPath.includes(drawer.className)) {
      this.visible && this.$emit('close', null)
    }
  }

  getStyles (val: number): void {
    if (/(left|right)/.test(this.placement)) {
      this.styles = { width: `${val}.px` }
    }
    else {
      this.styles = { height: `${val}.px` }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/renderer/assets/scss/_themeify.scss';
.win-drawer {
  position: absolute;
  width: 360px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: all .5s;
  @include background-color('bg-color-popover');

  &.top {
    top: 0;
    left: 0;
    right: 0;
  }

  &.bottom {
    bottom: 0;
    left: 0;
    right: 0;
  }

  &.left {
    top: 0;
    bottom: 0;
    left: 0;
  }

  &.right {
    top: 0;
    bottom: 0;
    right: 0;
  }
}
</style>