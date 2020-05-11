<template>
  <div class="win-controls" >
    <a class="iconfont icon-arrow-lift" @click="handleBack" v-bind:class="isGoBack"></a>
    <a class="iconfont icon-arrow-right" @click="handleForward" v-bind:class="isGoForward"></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component<Controls>({
  name: 'win-controls'
})
export default class Controls extends Vue {

  @Prop({ default: false }) isMacos!: boolean
  
  @Provide() isGoBack: string = 'disabled'
  @Provide() isGoForward: string = 'disabled'

  @Watch('$route')
  onRouteChange (route: Route) {
    this.isGoBack = this.$electron.remote.getCurrentWebContents().canGoBack() ? '' : 'disabled'
    this.isGoForward = this.$electron.remote.getCurrentWebContents().canGoForward() ? '' : 'disabled'
  }

  handleBack () {
    this.$router.go(-1)
  }

  handleForward () {
    this.$router.go(1)
  }
  
}
</script>

<style lang="scss" scoped>
@import '~/renderer/assets/scss/_themeify.scss';
.win-controls {
  align-self: center;
  display: flex;

  a {
    @include font-color('font-color-head-link');
    font-size: 22px;
    padding: 1px;
    display: block;
    cursor: default;
    margin: 4px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    text-decoration: none;
    text-align: center;

    &:hover {
      @include background-color('bg-color-header-iconhover');
    }

    &.disabled {
      @include font-color('font-color-link-disabled');
      &:hover {
        @include font-color('font-color-link-disabled');
      }
    }
  }
}

.topbar-main__win .win-controls {

  a {
    border-style: solid;
    border-width: 1px 1px 1px 0;
    @include border-color('font-color-head-link-disabled');
    border-radius: 0;
    margin: 0;
    height: 14px;
    line-height: 14px;

    &:first-child {
      border-width: 1px;
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>