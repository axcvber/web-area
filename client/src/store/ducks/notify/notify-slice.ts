import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VariantType } from 'notistack'
import { RootState } from '../..'
import { AuthResponse, LoginDto, RegisterDto } from '../../../api/interface'

type NotifyObj = {
  message: string
  dismissed?: boolean
  options: {
    variant: VariantType
    key: number
  }
}

export interface NotifyState {
  notifications: Array<NotifyObj>
}

const initialState: NotifyState = {
  notifications: [],
}

// export const fetchLogin = createAction<LoginDto>('user/fetchLogin')

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify: (state: NotifyState, { payload }: PayloadAction<NotifyObj>) => {
      state.notifications.push(payload)
    },
  },
})

export const { setNotify } = notifySlice.actions

export const selectNotification = (state: RootState) => state.notify

export default notifySlice.reducer
