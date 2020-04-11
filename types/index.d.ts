import Electron from 'electron'
import * as datastore from '~/renderer/datastore'

/**
 * 增强 Vue 自定义对象
 */
declare module 'vue/types/vue' {
  
  interface Vue {
    
    /**
     * 添加 ELectron 对象
     */
    $electron: typeof Electron

    /**
     * 添加 本地数据对象
     */
    $db: typeof datastore
  }
}