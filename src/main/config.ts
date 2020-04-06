
import { Configuration } from '@/types/configuration'

const pkg = require('@/package.json')
const electron = require('electron/package.json')

// 是否 Mac 环境
export const __MACOS__: boolean  = process.platform === 'darwin'
// 是否是开发模式
export const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

const config: Configuration = {
  // 应用名称
  appName: pkg.productName || '应用名称',
  // 定义协议头
  protocol: 'app',
  // 启动页
  startUrl: './index.html',
  // 关于面板选项
  aboutPanelOptions: {
    applicationName: pkg.productName,
    applicationVersion: pkg.version,
    credits: 'Author: thondery@163.com',
    copyright: 'Copyright (C) 2020 Kenote. All rights reserved.',
    version: electron.version
  },
  // 窗体属性
  windowOptions: {
    width: 1000,
    height: 668,
    minWidth: 1000,
    minHeight: 668,
    frame: !__MACOS__,
    titleBarStyle: __MACOS__ ? 'default' : 'hiddenInset',
    autoHideMenuBar: true,
    resizable: true
  }

}

export default config