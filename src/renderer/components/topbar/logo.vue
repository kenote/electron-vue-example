<template>
  <div class="topbar-logo">
    
    <win-tools :is-macos="isMacos" v-if="isMacos" />
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

  
}
</style>