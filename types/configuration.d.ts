import { BrowserWindowConstructorOptions, AboutPanelOptionsOptions } from 'electron'

/**
 * 应用配置
 */
export interface Configuration {

  /**
   * 应用名称
   */
  appName                  : string

  /**
   * 协议头
   */
  protocol                 : string

  /**
   * 启动页
   */
  startUrl                 : string

  /**
   * 关于面板选项
   */
  aboutPanelOptions       ?: AboutPanelOptionsOptions

  /**
   * 主窗体属性
   */
  windowOptions           ?: BrowserWindowConstructorOptions
}