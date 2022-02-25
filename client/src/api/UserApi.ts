import { AxiosResponse } from 'axios'
import $api from '.'
import { IEditProfileForm } from '../pages/profile/components/EditProfileForm'
import { AuthResponse } from './interface'

export default class UserApi {
  static async editProfile(formData: IEditProfileForm): Promise<AxiosResponse<AuthResponse>> {
    return $api.patch<AuthResponse>('/user/edit-profile', formData)
  }
}
