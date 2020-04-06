import { app, BrowserWindow, Menu } from 'electron'
import { applicationMenu } from '~/main/modules/menu'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import * as path from 'path'
import config, { isDevelopment, __MACOS__ } from '~/main/config'
import { getProtocolUrl } from '~/main/utils'

let win: BrowserWindow | null
const { appName, protocol, startUrl, windowOptions, aboutPanelOptions } = config

if (__MACOS__) {
  app.setAboutPanelOptions(aboutPanelOptions||{})
}

// 创建一个窗口
async function createWindow (): Promise<void> {
  // 创建窗口
  win = new BrowserWindow({ 
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      navigateOnDragDrop: true,
      devTools: true
    },
    ...windowOptions
  })
  // 加载启动页
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  }
  else {
    createProtocol(protocol)
    let url: string = getProtocolUrl(protocol, startUrl)
    win.loadURL(url)
  }
  // 设置窗口标题
  win.setTitle(appName)
  // 监听窗口关闭事件
  win.on('close', () => {
    win = null
  })
  // 监听窗口获得焦点并发送给渲染层
  win.on('focus', () => {
    if (win && win.webContents) {
      win.webContents.send('focusWindow')
    }
  })
  // 监听窗口失去焦点并发送给渲染层
  win.on('blur', () => {
    if (win && win.webContents) {
      win.webContents.send('blurWindow')
    }
  })
  // 加载顶部菜单
  Menu.setApplicationMenu(applicationMenu(win))
  // 开发模式设置
  if (isDevelopment) {
    // 安装vue-devtools
    let extensions: Record<string, Electron.ExtensionInfo> = BrowserWindow.getDevToolsExtensions()
    if (!extensions[ 'Vue.js devtools' ]) {
      BrowserWindow.addDevToolsExtension(path.resolve(process.cwd(), 'vue-devtools'))
    }
  }
}

// 启动应用
async function start () {
  try {
    // 初始化 Electron
    await app.whenReady()
    // 创建窗口
    await createWindow()
    // 监听所有窗口都关闭后关闭应用
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    // 应用被激活时，如果窗口关闭将自动激活
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })

    app.releaseSingleInstanceLock()
    app.on('second-instance', (event, argv, cwd) => {
      if (win) {
        if (win.isMaximized()) win.restore()
        win.focus()
      }
    })
  } catch (error) {
    console.error(error)
  }
}

start()