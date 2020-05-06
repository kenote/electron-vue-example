import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from '~/renderer/store'

export const name: string = 'setting'

export type ThemeTypes = 'auto' | 'green' | 'red' | 'dark'

export const types = {
  // SETNAME          : 'SETNAME',
  // SELECTCHANNEL    : 'SELECTCHANNEL',
  // CHANNELS         : 'CHANNELS',
  SETHEME          : 'SETHEME',
  DEFAULTHEME      : 'DEFAULTHEME'
}

export interface State {
  // name            ?: string
  // channelId        : number
  theme            : ThemeTypes
  darkTheme        : ThemeTypes
  defaultTheme     : ThemeTypes
}

export const namespaced: boolean = true

export const state = (): State => ({
  // name             : undefined,
  // channelId        : 1,
  theme            : 'auto',
  darkTheme        : 'dark',
  defaultTheme     : 'green'
})

export const getters: GetterTree<State, RootState> = {
  
}

export interface Actions<S, R> extends ActionTree<S, R> {
  // selectChannel(context: ActionContext<S, R>, channelId: number): void
}

export const actions: Actions<State, RootState> = {
  // selectChannel ({ commit }, channelId) {
  //   commit(types.SELECTCHANNEL, channelId)
  // }
}

export const mutations: MutationTree<State> = {
  // [types.SETNAME] (state: State, name: string): void {
  //   state.name = name
  // },
  // [types.SELECTCHANNEL] (state: State, channelId: number): void {
  //   state.channelId = channelId
  // },

  [types.SETHEME] (state: State, theme: ThemeTypes): void {
    state.theme = theme
  }
}