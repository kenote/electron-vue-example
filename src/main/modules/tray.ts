/**
 * 系统托盘
 */
import * as path from 'path'
import { app, Tray, nativeImage, NativeImage, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from 'electron'
import config, { __MACOS__, appRoot, BrowserTypes } from '~/main/config'
import { ApplicationOptions } from '@/types/electron'

function getApplicationMenuTemplate (win: BrowserWindow): Menu {
  let productName: string = win.getTitle()
  let applicationMenuTemplate: Array<MenuItem | MenuItemConstructorOptions> = [
    {
      label: `开发者工具`,
      click: () => {
        if (win.webContents.isDevToolsOpened()) {
          win.webContents.closeDevTools()
        }
        else {
          win.webContents.openDevTools()
        }
      }
    },
    {
      type: 'separator'
    },
    {
      label: `退出`,
      click: () => {
        app.quit()
      }
    }
  ]

  return Menu.buildFromTemplate(applicationMenuTemplate)
}

export const applicationTray = (options: ApplicationOptions<BrowserTypes>): Tray => {
  let { browser, log } = options
  let win = browser.main as BrowserWindow
  let productName: string = win.getTitle() as string
  let imagePath: string = path.resolve(appRoot, config.trayIcon!)
  let image: NativeImage = nativeImage.createFromPath(imagePath)
  let appTray: Tray = new Tray(image)
  if (!__MACOS__) {
    appTray.setToolTip(productName)
    appTray.setContextMenu(getApplicationMenuTemplate(win))
  }
  appTray.on('click', (event, bounds) => {
    if (!win.isVisible() || __MACOS__) {
      win.show()
    }
  })

  return appTray
}