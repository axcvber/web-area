import { combineReducers } from '@reduxjs/toolkit'
import notifySlice from './ducks/notify/notify-slice'
import userSlice from './ducks/user/user-slice'
import modalSlice from './ducks/modal/modal-slice'

export const rootReducer = combineReducers({
  user: userSlice,
  notify: notifySlice,
  modal: modalSlice,
})
