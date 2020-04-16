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
import { __MACOS__ } from '~/main/config'
import { UserProxy } from '@/types/proxys/user'
import '~/renderer/assets/iconfont/iconfont.css'

@Component<App>({
  
  async created () {
    
    
  }
})
export default class App extends Vue {
  
}
</script>

<style lang="scss">
</style>