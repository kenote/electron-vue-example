<template>
  <basic-layout >
    111222
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    <div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <el-date-picker
        v-model="value2"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </basic-layout>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import BasicLayout from '~/renderer/layouts/basic.vue'

@Component<Index>({
  components: {
    BasicLayout
  },
  created () {
    
  }
})
export default class Index extends Vue {

  @Provide() value1: string = ''
  @Provide() value2: string[] = []
  
}
</script>

<style lang="scss">

</style>