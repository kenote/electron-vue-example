import { ipcMain, BrowserWindow } from 'electron'
import { DataProxy } from '@/types/proxys'
import * as DB from '~/main/datastore'
import { restfulInfo } from '~/main/utils'
import { IError } from '@/types/restful'

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
}