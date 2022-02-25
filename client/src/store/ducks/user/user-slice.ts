import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { AuthResponse, LoginDto, RegisterDto } from '../../../api/interface'
import { IEditProfileForm } from '../../../pages/profile/components/EditProfileForm'

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export interface UserState {
  data: AuthResponse | null
  isLoggedIn: boolean | null
  isPending: boolean
  isError: boolean
  errorMessage: string | null
  status: AuthStatus
}

const initialState: UserState = {
  data: null,
  isLoggedIn: null,
  isPending: false,
  isError: false,
  errorMessage: null,
  status: AuthStatus.IDLE,
}

export const fetchLogin = createAction<LoginDto>('user/fetchLogin')
export const fetchLogout = createAction('user/fetchLogout')
export const fetchAuthMe = createAction('user/fetchAuthMe')
export const fetchConfirmEmail = createAction<string>('user/fetchConfirmEmail')
export const fetchResendConfirmLink = createAction<string>('user/fetchResendConfirmLink')

export const fetchRegister = createAction<RegisterDto>('user/fetchRegister')

export const fetchResetPassword = createAction<{ email: string; password: string }>('user/fetchResetPassword')
export const fetchForgotPassLink = createAction<string>('user/fetchForgotPassLink')

//google
export const fetchGoogleAuth = createAction<string>('user/fetchGoogleAuth')

//user
export const fetchEditProfile = createAction<IEditProfileForm>('user/fetchEditProfile')

export const fetchRemoveProfile = createAction('user/fetchRemoveProfile')

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state: UserState, { payload }: PayloadAction<AuthResponse>) => {
      state.data = payload
      state.isLoggedIn = true
      state.isPending = false
      state.status = AuthStatus.SUCCEEDED
    },
    setPending: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isPending = payload
      state.status = AuthStatus.LOADING
    },
    setError: (state: UserState, { payload }: PayloadAction<string>) => {
      state.isPending = false
      state.isError = true
      state.isLoggedIn = false
      state.errorMessage = payload
      state.status = AuthStatus.FAILED
    },
    // clearState: () => initialState,
    clearState: (state: UserState) => {
      state.data = null
      state.isLoggedIn = false
      state.isPending = false
      state.isError = false
      state.errorMessage = null
      // state.status = AuthStatus.SUCCEEDED
    },

    setStatus: (state: UserState, { payload }: PayloadAction<AuthStatus>) => {
      state.status = payload
    },
  },
})

export const { setUserData, setPending, setError, clearState, setStatus } = userSlice.actions

export const selectUserState = (state: RootState) => state.user

export default userSlice.reducer
