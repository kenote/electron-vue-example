<template>
  <div >
    SettingView
    <a>sss</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import BasicLayout from '~/renderer/layouts/basic.vue'

@Component<SettingView>({
  components: {
    BasicLayout
  },
  created () {
    
  }
})
export default class SettingView extends Vue {

  @Provide() value1: string = ''
  @Provide() value2: string[] = []
  
}
</script>

<style lang="scss">

</style>