import Vue from 'vue'
import Vuex, { ModuleTree, Plugin, Store } from 'vuex'
import * as setting from '~/renderer/store/modules/setting'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import { isDevelopment } from '~/main/config'
import SecureLS from 'secure-ls'

export interface State extends Record<string, any> {}

export const state = (): State => ({})

interface ModulesStates extends Record<string, any> {}

export type RootState = State & ModulesStates

Vue.use(Vuex)
let ls: SecureLS = new SecureLS({ isCompression: false })
const createPersisted: Plugin<RootState> = createPersistedState({
  storage: !isDevelopment ? {
    getItem: (key: string) => ls.get(key),
    setItem: (key: string, value: any) => ls.set(key, value),
    removeItem: (key: string) => ls.remove(key)
  }: undefined
})
let plugins: Array<Plugin<RootState>> = [ createPersisted ]
if (isDevelopment) {
  plugins = [ createLogger(), ...plugins ]
}

const stote: Store<RootState> = new Vuex.Store<RootState>({
  modules: {
    [setting.name]: setting
  },
  plugins
})

export default stote