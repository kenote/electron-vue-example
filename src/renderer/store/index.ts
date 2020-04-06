import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'
import * as setting from '~/renderer/store/modules/setting'

export interface State extends Record<string, any> {}

export const state = (): State => ({})

interface ModulesStates extends Record<string, any> {}

export type RootState = State & ModulesStates

Vue.use(Vuex)

const stote = new Vuex.Store({
  modules: {
    [setting.name]: setting
  }
})

export default stote