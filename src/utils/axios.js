import axios from 'axios'
import { API_BASE_URL } from '@/config'

import { message, notification } from 'antd'
import { getToken } from '@/utils'

// create an axios instance
const service = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
})

let timer

// 异常拦截处理器
const errorHandler = error => {
  console.log('err' + error)
  let { message } = error
  if (message === 'Network Error') {
    message = '后端接口连接异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常'
  }
  notification.error({
    message: message,
    duration: 5 * 1000,
  })
  return Promise.reject(error)
}

// 拦截请求
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.common['Authorization'] = token
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        var part = encodeURIComponent(propName) + '='
        if (value && typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              const params = propName + '[' + key + ']'
              var subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    message.error('bed request')
    Promise.reject(error)
  },
  errorHandler
)

// 拦截响应
service.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data
  },
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err.response) {
        const { status, data } = err.response
        switch (status) {
          case 401:
            message.error((data && data.message) || '登录信息过期或未授权，请重新登录！')
            break

          default:
            message.error(data.message || `连接错误 ${status}！`)
            break
        }
      } else {
        message.error(err.message)
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
  }
)

export default service
