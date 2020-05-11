<template>
  <div >
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'

@Component<SettingView>({
  components: {
    
  },
  created () {
    
  }
})
export default class SettingView extends Vue {

  @Prop({ default: '' }) title!: string

  @Provide() value1: string = ''
  @Provide() value2: string[] = []

  handleOpenExternal (e: MouseEvent) {
    e.preventDefault()
    let link: HTMLLinkElement = e.target as HTMLLinkElement
    this.$electron.remote.shell.openExternal(link.href)
  }
  
}
</script>

<style lang="scss">

</style>