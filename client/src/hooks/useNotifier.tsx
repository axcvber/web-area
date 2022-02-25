import React from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectNotification } from '../store/ducks/notify/notify-slice'

let displayed = [] as any

const useNotifier = () => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector(selectNotification)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: number) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: number) => {
    displayed = [...displayed.filter((key: number) => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(({ message, options = {}, dismissed = false }, key: number) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        // onClose: (event, reason, myKey) => {
        //     if (options.onClose) {
        //         options.onClose(event, reason, myKey);
        //     }
        // },
        // onExited: (event, myKey) => {
        //     // remove this snackbar from redux store
        //     dispatch(removeSnackbar(myKey));
        //     removeDisplayed(myKey);
        // },
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useNotifier
