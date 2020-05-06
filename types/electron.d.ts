import { BrowserWindow } from 'electron'
import { ElectronLog } from 'electron-log'

/**
 * 应用选项
 */
export interface ApplicationOptions<T extends string> {
  /**
   * 窗体
   */
  browser                : Record<T, BrowserWindow | null | undefined>
  /**
   * 日志
   */
  log                    : ElectronLog
}