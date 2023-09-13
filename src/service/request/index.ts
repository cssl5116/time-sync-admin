import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { RequestConfig } from './type'

class Request {
  instance: AxiosInstance
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        // TODO: add Token/Loading...
        return config
      },
      (err) => err
    )
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
    this.instance.interceptors.response.use(
      (res) => {
        // TODO: remove Loading...
        return res.data
      },
      (err) => {
        // TODO: remove Loading...
        return err?.response?.data || err
      }
    )
  }
  request<T = any>(config: RequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }
  get<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'post' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request