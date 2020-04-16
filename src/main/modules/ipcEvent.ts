import { ipcMain, BrowserWindow, app } from 'electron'
import { DataProxy } from '@/types/proxys'
import * as DB from '~/main/datastore'
import { restfulInfo } from '~/main/utils'
import { IError } from '@/types/restful'
import { __MACOS__ } from '~/main/config'
import { oc } from 'ts-optchain'

export default function (win: BrowserWindow): void {
  // DB Event
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
      hide: () => app.hide(),
      quit: () => app.quit()
    }
    oc(exc[args])(app.quit)()
  })
}