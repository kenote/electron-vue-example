import { ipcMain, BrowserWindow, app, systemPreferences, nativeTheme } from 'electron'
import { DataProxy } from '@/types/proxys'
import * as DB from '~/main/datastore'
import { restfulInfo } from '~/main/utils'
import { IError } from '@/types/restful'
import { __MACOS__, BrowserTypes } from '~/main/config'
import { oc } from 'ts-optchain'
import { ApplicationOptions } from '@/types/electron'



export default function (options: ApplicationOptions<BrowserTypes>): void {
  let { browser, log } = options
  let win = browser.main as BrowserWindow
  // 监听数据库操作
  ipcMain.on('DB', async (evt, args) => {
    let { name, path, payload } = args as DataProxy<any>
    try {
      evt.returnValue = await DB[name][path](payload)
    } catch (error) {
      let { code, message } = error as IError
      evt.returnValue = restfulInfo(null, { code: code || 1000, message })
    }
  })
  // 关闭窗口操作
  ipcMain.on('win-tools', (evt, args) => {
    let exc = {
      hide: () => __MACOS__ ? app.hide() : win.hide(),
      quit: () => app.quit()
    }
    oc(exc[args])(app.quit)()
  })
  // 监听网络状态
  ipcMain.on('online-status-changed', (evt, status) => {
    evt.reply('online-status', status)
  })
  if (__MACOS__) {
    // 监听系统暗黑模式切换
    systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', evt => {
      setTimeout(() => {
        if (win && win.webContents) {
          win.webContents.send('systemDarkMode', nativeTheme.shouldUseDarkColors)
        }
      }, 300)
    })
  }
}