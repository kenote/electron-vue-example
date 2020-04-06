
/**
 * 获取协议地址
 * @param protocol string
 * @param url string
 */
export function getProtocolUrl (protocol: string, url: string): string {
  let urlname: string = /^(\.\/)/.test(url) ? url : `./${url||'index.html'}`
  return `${protocol}://${urlname}`
}