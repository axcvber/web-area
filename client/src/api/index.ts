import axios from 'axios'
import AuthApi from './AuthApi'
import { AuthResponse } from './interface'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

// $api.interceptors.response.use(
//   (res) => {
//     return res
//   },
//   async (err) => {
//     const originalConfig = err.config

//     if (originalConfig.url !== '/auth/login' && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true

//         try {
//           const { data } = await AuthApi.refresh()
//           localStorage.setItem('token', data.currentHashedRefreshToken)
//           return $api(originalConfig)
//         } catch (_error) {
//           return Promise.reject(_error)
//         }
//       }
//     }

//     return Promise.reject(err)
//   }
// )

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const { data } = await AuthApi.refresh()
        localStorage.setItem('token', data.currentHashedRefreshToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
    throw error
  }
)

export default $api
