import * as Nedb from 'nedb'

/**
 * 数据代理
 */
export interface DataProxy<T extends Record<string, any>> {

  /**
   * 接口名称
   */
  name         : string

  /**
   * 接口路径
   */
  path         : string

  /**
   * 请求参数
   */
  payload      : T
}

/**
 * 基础数据
 */
export interface BaseData {

  /**
   * _id
   */
  _id                  : string

  /**
   * 创建时间
   */
  createdAt            : Date

  /**
   * 更新时间
   */
  updatedAt            : Date
}

/**
 * 数据代理
 */
export declare namespace DataProxy {

  /**
   * 获取数据
   */
  interface get {

    /**
     * 查询条件
     */
    query               ?: any

    /**
     * 是否获取多个
     */
    multi               ?: boolean

    /**
     * 排序
     */
    sort                ?: any

    /**
     * 列表时，取的记录条数
     */
    limit               ?: number

    /**
     * 列表时，跳过的记录条数
     */
    skip                ?: number
  }

  /**
   * 更新数据
   */
  interface update {

    /**
     * 查询条件
     */
    query               ?: any

    /**
     * 更新内容
     */
    updateQuery          : any

    /**
     * 更新选项
     */
    options             ?: Record<string, any>
  }

  /**
   * 删除数据
   */
  interface remove {
    
    /**
     * 查询条件
     */
    query               ?: any

    /**
     * 删除选项
     */
    options             ?: Nedb.RemoveOptions
  }

}
