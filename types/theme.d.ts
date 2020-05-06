
/**
 * 主题模型
 */
export interface Theme {

  /**
   * key
   */
  key           : string

  /**
   * 名称
   */
  name          : string

  /**
   * 主题标签
   */
  theme         : string
  
  /**
   * 选择样式
   */
  style         : string

  /**
   * 是否暗色系
   */
  isDark       ?: boolean
}