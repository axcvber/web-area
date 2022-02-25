import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { Grow, Slide } from '@mui/material'
import { useHideModal, useModal } from '../hooks/modal-hook'
import EditProfileForm from '../pages/profile/components/EditProfileForm'
import ChangePassword from './ChangePassword'
import { useAppSelector } from '../store/hooks'
import { AuthStatus, selectUserState } from '../store/ducks/user/user-slice'
import UploadImageViewer from './UploadImageViewer'
import ConfirmModal from './ConfirmModal'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />
})

const MODAL_TYPES: any = {
  'edit-profile': EditProfileForm,
  'change-password': ChangePassword,
  'upload-image': UploadImageViewer,
  'confirm': ConfirmModal,
}

export const ModalWrapper = () => {
  const { status } = useAppSelector(selectUserState)
  // Get modal params from redux store
  const { modal } = useModal()
  const { handleOnClose } = useHideModal()

  // const CustomComponent = lazy(() => import(`../pages/profile/components/EditProfileForm`))

  // if (!modal.type) {
  //   return null
  // }

  // const SpecifiedModal = MODAL_TYPES[modal.type]

  const componentsLookUp = MODAL_TYPES
  let renderComponent
  if (modal.type) {
    const SelectedComponent = componentsLookUp[modal.type]
    if (SelectedComponent) {
      renderComponent = <SelectedComponent file={modal.file} />
    }
  }

  return (
    <Dialog
      open={modal.open}
      TransitionComponent={Transition}
      onClose={handleOnClose}
      keepMounted
      aria-describedby='alert-dialog-slide-description'
      PaperProps={{
        sx: {
          background: '#1D1D41',
        },
      }}
    >
      {modal.title && <DialogTitle>{modal.title}</DialogTitle>}

      <DialogContent>
        {renderComponent}
        {/* <Suspense fallback={<div>Loading...</div>}>{modal.componentPath ? <CustomComponent /> : modal.body}</Suspense> */}
      </DialogContent>
      {/* <DialogActions>
        <Button
          form='edit-profile-form'
          type='submit'
          variant='contained'
          sx={{ textTransform: 'inherit', fontWeight: 400 }}
          disabled={status === AuthStatus.LOADING}
          onClick={modal.onButtonClick}
        >
          Save
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={handleOnClose}
          sx={{ textTransform: 'inherit', fontWeight: 400 }}
        >
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}
