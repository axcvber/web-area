import { AxiosResponse } from 'axios'
import $api from '.'
import { AuthResponse, LoginDto, RegisterDto } from './interface'

export default class AuthApi {
  static async login(formData: LoginDto): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', formData)
  }

  static async register(formData: RegisterDto): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', formData)
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/logout')
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/auth/refresh')
  }

  static async authMe(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/auth')
  }

  static async confirmEmail(token: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/email-confirmation/confirm', { token })
  }

  static async resendConfirmLink(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/email-confirmation/resend-confirm-link', { email })
  }

  static async forgotPassword(email: string): Promise<void> {
    return $api.post('/auth/forgot-password', { email })
  }

  static async resetPassword(formData: { email: string; password: string }): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/reset-password', formData)
  }

  //google
  static async googleAuth(token: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/google-auth', { token })
  }
}

// export const AuthApi = {
//   async register(dto: RegisterDto): Promise<AxiosResponse<AuthResponse>> {
//     const data = await $api.post<AuthResponse>('/auth/register', dto)
//     return data
//   },
//   async authMe(): Promise<AxiosResponse<AuthResponse>> {
//     const data = await $api.get<AuthResponse>('/auth')
//     return data
//   },
//   async login(dto: LoginDto): Promise<AxiosResponse<AuthResponse>> {
//     const data = await $api.post<AuthResponse>('/auth/login', dto)
//     return data
//   },
//   async logout() {
//     await $api.post<AxiosResponse>('/auth/logout')
//   },
// }
