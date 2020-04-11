import { BaseData } from './'

/**
 * 用户数据
 */
export declare namespace UserProxy {

  /**
   * 创建用户
   */
  interface create {

    /**
     * 用户名
     */
    username             : string
    
  }

  /**
   * 数据
   */
  interface data extends baseData {

  }

  /**
   * 基础数据
   */
  interface baseData extends BaseData {

    /**
     * 用户名
     */
    username             : string
  }
}