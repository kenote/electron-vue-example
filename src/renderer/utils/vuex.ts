import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import * as setting from '~/renderer/store/modules/setting'
import { mapValues } from 'lodash'

export const Setting: BindingHelpers = namespace(setting.name)
export const settingTypes = mapValues(setting.types, value => `${setting.name}/${value}`)