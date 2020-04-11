

/**
 * 错误信息
 */
export interface ErrorInfo {

  /**
   * 错误编号
   */
  code                  : number

  /**
   * 错误描述
   */
  message              ?: string
}

/**
 * 回调信息
 */
export interface RestfulInfo<T extends any> {
  
  /**
   * 返回数据
   */
  data                  : T

  /**
   * 错误信息
   */
  Status                : ErrorInfo
}

export interface IError extends Error {

  /**
   * 错误编号
   */
  code                 ?: number
}