import { app, BrowserWindow, Menu, protocol, Tray, ipcMain, systemPreferences, nativeTheme } from 'electron'
import { applicationMenu } from '~/main/modules/menu'
import { applicationTray } from '~/main/modules/tray'
import { applicationDockMenu } from '~/main/modules/dock'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import config, { isDevelopment, __MACOS__, electron } from '~/main/config'
import { getProtocolUrl } from '~/main/utils'
import ipcEvent from '~/main/modules/ipcEvent'
import log from 'electron-log'

let win: BrowserWindow | null
let appTray: Tray | null
const { appName, scheme, startUrl, windowOptions, aboutPanelOptions } = config

// log.transports.file.level = 'info'

/**
 * [1] Unable to create basic Accelerated OpenGL renderer.
 * [1] Unable to create basic Accelerated OpenGL renderer.
 * [1] Core Image is now using the software OpenGL renderer. This will be slow.
 */
app.commandLine.appendArgument('--enable-features=Metal')

/**
 * fix: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.
 */
protocol.registerSchemesAsPrivileged([
  { scheme, privileges: { standard: true, supportFetchAPI: true, secure: true } }
])

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
    createProtocol(scheme)
    let url: string = getProtocolUrl(scheme, startUrl)
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
  // 监听窗口最大化
  win.on('maximize', () => {
    if (win && win.webContents) {
      win.webContents.send('maximizeWindow')
    }
  })
  // 监听窗口最大化还原
  win.on('unmaximize', () => {
    if (win && win.webContents) {
      win.webContents.send('unmaximizeWindow')
    }
  })
  // 监听窗口全屏化
  win.on('enter-full-screen', () => {
    if (win && win.webContents) {
      win.webContents.send('enterfullscreenWindow')
    }
  })
  // 监听窗口全屏化还原
  win.on('leave-full-screen', () => {
    if (win && win.webContents) {
      win.webContents.send('leavefullscreenWindow')
    }
  })
  // 初次加载时事件
  win.once('ready-to-show', () => {
    if (win && !win.isVisible()) {
      win.show()
    }
  })
  // 加载顶部菜单
  Menu.setApplicationMenu(applicationMenu(win))
  // 加载托盘菜单
  // if (!appTray) {
  appTray = applicationTray({ browser: { main: win! }, log })
  // }
  if (__MACOS__) {
    // 加载Dock菜单
    app.dock.setMenu(applicationDockMenu())
  }
}

// 启动应用
async function start () {
  try {
    /**
     * issues: https://github.com/electron/electron/issues/18397
     * Land the app.allowRendererProcessReuse option in Electron 6
     * Have the first deprecation warning land in Electron 7 for non-context aware native modules
     * Have a deprecation warning land in Electron 8 for the default value of app.allowRendererProcessReuse to switch
     * Switch the default value of app.allowRendererProcessReuse to true in Electron 9
     * Deprecate the ability to change app.allowRendererProcessReuse in Electron 10
     * Remove the ability to change app.allowRendererProcessReuse in Electron 11
     */
    let electronVersion: string = electron.version
    let [ mainVerionNumber ] = electronVersion.split('.').map(Number)
    if (mainVerionNumber === 8) {
      app.allowRendererProcessReuse = true
    }
    // 初始化 Electron
    await app.whenReady()
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installVueDevtools()
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
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
    // 监听渲染层 IPC 请求
    ipcEvent({ browser: { main: win! }, log })
  } catch (error) {
    log.error(error)
  }
}

start()