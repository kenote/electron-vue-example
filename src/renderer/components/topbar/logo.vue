<template>
  <div class="topbar-logo" v-if="isMacos">
    <win-tools :is-macos="isMacos" v-if="isMacos" />
    <win-controls :is-macos="isMacos" v-if="isMacos"  />
  </div>
  <div class="topbar-logo" v-else>
    <img src="../../assets/images/logo.svg" class="logo"  />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'

@Component<TopbarLogo>({
  name: 'topbar-logo',
  components: {
    
  },
  created () {
    
    
  }
})
export default class TopbarLogo extends Vue {

  @Prop({ default: false }) isMacos!: boolean
  
}
</script>

<style lang="scss" scoped>
.topbar-logo {
  flex: 0 0 200px;
  display: flex;
  justify-content: space-between;

  .logo {
    height: 24px;
    margin-left: 8px;
    align-self: center;
  }
}
</style>