import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../..'

export interface ModalState {
  open: boolean
  title: string
  subtitle?: string
  componentProps: any
  body: any
  type: string | null
  file?: any
  // open?: boolean
  // mounted?: boolean
  // modalType: string | null
  // modalProps: IModalProps
  onButtonClick: () => void
}

const initialState: ModalState = {
  open: false,
  title: '',
  subtitle: '',
  componentProps: null,
  body: null,
  type: null,
  file: null,
  onButtonClick: () => {},
}

// export const fetchLogin = createAction<LoginDto>('user/fetchLogin')

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state: ModalState, { payload }: PayloadAction<any>) => {
      state.open = true
      state.title = payload.title
      state.body = payload.body
      state.type = payload.type
      state.file = payload.file
      state.onButtonClick = payload.onButtonClick
    },
    hideModal(state) {
      state.open = false
      // state.type = null
    },
  },
})

export const { showModal, hideModal } = modalSlice.actions

export const getCurrentModal = (state: RootState) => state.modal

export default modalSlice.reducer
