import * as path from 'path'
import * as fs from 'fs-extra'
import { app } from 'electron'
import { DataStoreOptions } from 'nedb'
import Datastore from 'nedb-promises'
import { __NEDB__ } from '~/main/config'

const STORE_PATH = app.getPath('userData')
const dataStorePath: string = path.resolve(STORE_PATH, __NEDB__)

if (!fs.existsSync(dataStorePath)) {
  fs.mkdirpSync(dataStorePath)
}

function loadDatabase (name: string, options?: DataStoreOptions): Datastore {
  let filename: string = path.resolve(STORE_PATH, __NEDB__, `${name}.db`)
  return new Datastore({
    autoload: true,
    timestampData: true,
    corruptAlertThreshold: 1,
    filename,
    ...options
  })
}

export const user: Datastore = loadDatabase('user')