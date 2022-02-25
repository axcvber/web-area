import { useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getCurrentModal, hideModal, showModal } from '../store/ducks/modal/modal-slice'
// import EditProfileForm from '../pages/profile/components/EditProfileForm'

export const useModal = () => {
  // Get modal params from store using reselect
  return {
    modal: useSelector(getCurrentModal, shallowEqual),
  }
}

export const useEditProfileModal = () => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(
      showModal({
        title: 'Edit profile',
        type: 'edit-profile',
      })
    )
  }, [dispatch])
}

export const useBasicModalExample = () => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(
      showModal({
        title: 'Test Modal',
        // body: 'This is a basic action Modal',
        componentPath: '../pages/profile/components/EditProfileForm',
      })
    )
  }, [dispatch])
}

export const useChangePassModal = () => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(
      showModal({
        title: 'Change Password',
        type: 'change-password',
      })
    )
  }, [dispatch])
}

export const useUploadViewModal = (file: any) => {
  const dispatch = useDispatch()
  return useCallback(() => {
    dispatch(
      showModal({
        title: 'UploadViewModal',
        type: 'upload-image',
        file: file,
      })
    )
  }, [dispatch])
}

export const useShowModal = (props: any) => {
  const dispatch = useDispatch()
  return useCallback(
    (params = {}) => {
      dispatch(showModal({ ...props, ...params }))
    },
    [dispatch]
  )
}

//  export const useErrorModal = props => {
//      const dispatch = useDispatch();
//     return {
//         handleShowErrorModal: useCallback(
//             error => {
//                 dispatch(showErrorModalAction({ ...props }));
//             },
//             [dispatch]
//         )
//     };
// };

export const useConfirmationModal = () => {
  return {
    // Create your reusable confirmation modal logic
  }
}

export const useInfoModal = () => {
  return {
    // Create your reusable info modal logic
  }
}

export const useHideModal = () => {
  const dispatch = useDispatch()
  const handleOnClose = useCallback(() => {
    dispatch(hideModal())
  }, [dispatch])
  return {
    handleOnClose,
  }
}
