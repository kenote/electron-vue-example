import { app, Menu, MenuItem, MenuItemConstructorOptions, BrowserWindow } from 'electron'

const __MACOS__  = process.platform === 'darwin'

function getApplicationMenuTemplate (win: BrowserWindow) {
  let applicationMenuTemplate: Array<MenuItem | MenuItemConstructorOptions> = []
  let productName: string = win.getTitle()
  if (__MACOS__) {
    applicationMenuTemplate.unshift({
      label: 'myapp',
      submenu: [
        {
          label: `关于 myapp`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: `重启 ${productName}`,
          click: () => {
            app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
            app.exit(0)
          }
        },
        {
          type: 'separator'
        },
        {
          label: `退出 ${productName}`,
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    }, {
      label: '帮助',
      submenu: [
        {
          label: `开发者工具`,
          accelerator: 'Option+Command+I',
          click: () => {
            if (win.webContents.isDevToolsOpened()) {
              win.webContents.closeDevTools()
            }
            else {
              win.webContents.openDevTools()
            }
          }
            
        }
      ]
    })
  }

  return applicationMenuTemplate
}

export const applicationMenu = (win: BrowserWindow): Menu => Menu.buildFromTemplate(getApplicationMenuTemplate(win))