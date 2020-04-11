import { RestfulInfo, ErrorInfo, IError } from '@/types/restful'

/**
 * 获取协议地址
 * @param protocol string
 * @param url string
 */
export function getProtocolUrl (protocol: string, url: string): string {
  let urlname: string = /^(\.\/)/.test(url) ? url : `./${url||'index.html'}`
  return `${protocol}://${urlname}`
}

/**
 * 回调信息
 * @param data 
 * @param error 
 */
export function restfulInfo (data: any, error?: ErrorInfo): RestfulInfo<any> {
  let restful: RestfulInfo<any> = {
    data,
    Status: error || { code: 0 }
  }
  return restful
}

/**
 * 错误信息
 * @param code 
 * @param message 
 */
export function errorInfo (code: number, message: string): IError {
  let error: IError = new Error(message)
  error.code = code
  return error
}