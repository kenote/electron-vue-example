import { ipcRenderer } from 'electron'
import { DataProxy } from '@/types/proxys'
import { UserProxy } from '@/types/proxys/user'
import { RestfulInfo } from '@/types/restful'

/**
 * 创建用户
 * @param payload UserProxy.create
 */
export async function create (payload: UserProxy.create): Promise<RestfulInfo<UserProxy.data>> {
  // payload
  return ipcRenderer.sendSync('DB', { name: 'user', path: 'create', payload })
}

/**
 * 获取用户
 * @param payload UserProxy.create
 */
export async function get (payload?: DataProxy.get): Promise<RestfulInfo<UserProxy.data | UserProxy.data[]>> {
  // payload
  return ipcRenderer.sendSync('DB', { name: 'user', path: 'get', payload })
}

/**
 * 更新用户
 * @param payload UserProxy.update
 */
export async function update (payload: DataProxy.update): Promise<RestfulInfo<UserProxy.data | UserProxy.data[] | number>> {
  // payload
  return ipcRenderer.sendSync('DB', { name: 'user', path: 'update', payload })
}

/**
 * 删除用户
 * @param payload DataProxy.remove
 */
export async function remove (payload?: DataProxy.remove): Promise<RestfulInfo<number>> {
  // payload
  return ipcRenderer.sendSync('DB', { name: 'user', path: 'remove', payload })
}