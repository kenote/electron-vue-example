<template>
  <div>
    Index
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
// import BasicLayout from '~/renderer/layouts/basic.vue'

@Component<HomeView>({
  components: {
    // BasicLayout
  },
  created () {
    
  }
})
export default class HomeView extends Vue {

  @Provide() value1: string = ''
  @Provide() value2: string[] = []
  
}
</script>

<style lang="scss">

</style>