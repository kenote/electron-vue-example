<template>
  <div class="theme-setting">
    <div class="theme-item" v-for="(item, key) in themes" :key="key" @click="() => handleClick(item.key)">
      <div class="theme-item-entity" v-bind:class="item.style">
        <i class="el-icon-check" v-if="value === item.key"></i>
      </div>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Watch, Model } from 'vue-property-decorator'
import { themes } from '~/renderer/utils'

@Component<ThemeSetting>({
  name: 'win-themesetting'
})
export default class ThemeSetting extends Vue {

  // @Provide() value: string = 'auto'
  @Provide() themes = themes

  @Model('update') readonly value!: string

  handleClick (value: string): void {
    this.$emit('update', value)
  }

}
</script>

<style lang="scss" scoped>
.theme-setting {
  display: flex;
  flex-wrap: wrap;

  .theme-item {
    width: 40px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .theme-item-entity {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

      &.dark {
        background-color: #000;
      }

      &.green {
        background-color: #11bd9f;
      }

      &.red {
        background-color: #e62424;
      }

      &.auto {
        background-color: #fff;
        background: linear-gradient(to bottom right, #fff, 70%, #666);
        color: #666;
      }
    }

    span {
      font-size: 12px;
      margin: 8px 4px 0;
      color: #999;
    }
  }
}
</style>