import * as DB from '~/main/modules/datastore'
import { DataProxy } from '@/types/proxys'
import { UserProxy } from '@/types/proxys/user'
import { RestfulInfo } from '@/types/restful'
import { errorInfo, restfulInfo } from '~/main/utils'
import { oc } from 'ts-optchain'

/**
 * 创建用户
 * @param payload UserProxy.create
 */
export async function create (payload: UserProxy.create): Promise<RestfulInfo<UserProxy.data>> {
  let { username } = payload
  if (!username) {
    throw errorInfo(1000, `用户名不能为空`)
  }
  let user = await DB.user.findOne({ username }) as UserProxy.data
  if (user) {
    throw errorInfo(1000, `用户名已存在`)
  }
  let newUser = await DB.user.insert(payload)
  return restfulInfo(newUser)
}

/**
 * 获取用户
 * @param payload DataProxy.get
 */
export async function get (payload?: DataProxy.get): Promise<RestfulInfo<UserProxy.data | UserProxy.data[]>> {
  let { query, multi, sort, limit, skip } = payload || {}
  let data: UserProxy.data | UserProxy.data[][]
  if (multi || !query) {
    data = await DB.user.find(query).sort(sort).limit(limit || 0).skip(skip || 0).exec() as UserProxy.data[][]
  }
  else {
    data = await DB.user.findOne(query) as UserProxy.data
  }
  return restfulInfo(data)
}

/**
 * 更新用户
 * @param payload DataProxy.update
 */
export async function update (payload: DataProxy.update): Promise<RestfulInfo<UserProxy.data | UserProxy.data[] | number>> {
  let { query, updateQuery, options } = payload
  let user = await DB.user.update(query, updateQuery, { ...options })
  return restfulInfo(user)
}

/**
 * 删除用户
 * @param payload DataProxy.remove
 */
export async function remove (payload: DataProxy.remove): Promise<RestfulInfo<number>> {
  let { query, options } = payload || {}
  let multi: boolean = !query ? true : oc(options).multi(false)
  let result = await DB.user.remove(query, { ...options, multi })
  return restfulInfo(result)
}