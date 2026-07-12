import axios, { AxiosHeaders } from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

const getAuthorization = (headers) => {
  if (headers && typeof headers.get === 'function') {
    return headers.get('Authorization')
  }
  return headers?.Authorization || headers?.authorization
}

const maskAuthorization = (authorization) => {
  if (!authorization) return ''
  return `${authorization.slice(0, 24)}...`
}

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo?.token
    const headers = AxiosHeaders.from(config.headers)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    } else {
      headers.delete('Authorization')
    }

    config.headers = headers

    // if (import.meta.env.DEV) {
    //   const authorization = getAuthorization(config.headers)
    //   console.log('[http request]', {
    //     url: `${config.baseURL || ''}${config.url || ''}`,
    //     method: config.method?.toUpperCase(),
    //     hasToken: Boolean(token),
    //     hasAuthorization: Boolean(authorization),
    //     authorization: maskAuthorization(authorization),
    //   })
    // }

    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const userStore = useUserStore()
        userStore.cleanUserInfo()
        ElMessage.error('登录已过期，请重新登录')
        router.replace('/login')
      } else {
        ElMessage.error(`请求失败：${error.response.status} ${error.response.statusText}`)
      }
    } else if (error.request) {
      ElMessage.error('网络错误或请求超时，请稍后重试')
    } else {
      ElMessage.error(`请求错误：${error.message}`)
    }

    return Promise.reject(error)
  },
)

export default instance;
