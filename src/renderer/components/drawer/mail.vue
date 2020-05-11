<template>
  <win-drawer class="drawer__email" :width="width" :visible="visible" @close="$emit('close')">
    <div class="__head">
      <el-radio-group v-model="msg" size="small">
        <el-radio-button label="private">私信</el-radio-button>
        <el-radio-button label="comment">评论</el-radio-button>
        <el-radio-button label="at">@我</el-radio-button>
        <el-radio-button label="notify">通知</el-radio-button>
      </el-radio-group>
    </div>
    <div class="__main" ref="theMain">
      <perfect-scrollbar>
        <div>
          <!-- start<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          ...<br>
          end -->
        </div>
      </perfect-scrollbar>
    </div>
  </win-drawer>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Watch, Emit } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component<MainDrawer>({
  name: 'mail-drawer',
  created () {
    
  },
  mounted () {
    
  }
})
export default class MainDrawer extends Vue {

  @Prop({ default: false }) visible!: boolean

  @Provide() width: number = 350
  @Provide() msg: string = 'private' // private | comment | at | notify

  
}
</script>

<style lang="scss" >
@import '~/renderer/assets/scss/_themeify.scss';
.drawer__email {
  display: flex;
  flex-direction: column;

  .__head {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      @include background-color('bg-color-radio-inner-active');
      @include themeify {
        border-color: themed('bg-color-radio-inner-active')!important;
        box-shadow: -1px 0 0 0 themed('bg-color-radio-inner-active')!important;
      }
      @include font-color('font-color-radio-inner-active');

      &:hover {
        @include font-color('font-color-radio-inner-active');
      }
    }

    .el-radio-button {

      &:first-child .el-radio-button__inner {
        border-radius: 16px 0 0 16px;
      }

      &:last-child .el-radio-button__inner {
        border-radius: 0 16px 16px 0;
      }
    }  
    .el-radio-button__inner {
      width: 74px;
      background-color: transparent;
      @include border-color('border-color-radio-inner');
      @include font-color('font-color-radio-inner');

      &:hover {
        @include background-color('bg-color-radio-inner-hover');
        @include font-color('font-color-radio-inner-hover');
      }
    }
  }

  .__main {
    // height: 100%;
    width: 100%;

    // .ps>div {
    //   // margin: 10px;
    // }
  }
}
</style>