<template>
  <fragment>
    <header>

    </header>
    <main>
      <slot></slot>
    </main>
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<Index>({
  
  created () {
    
    
    
  }
})
export default class Index extends Vue {
  
}
</script>

<style lang="scss">
header {
  height: 80px;
  -webkit-app-region: drag;
  display: flex;
  border-bottom: 1px #ccc solid;
}
</style>