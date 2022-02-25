import React, { ReactChild } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Search from './Search'
import { Grow, Zoom } from '@mui/material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Grow unmountOnExit ref={ref} {...props} />
})

interface IModal {
  children: ReactChild
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
}

const Modal: React.FC<IModal> = ({ open, onClose, children, title, subtitle }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby='alert-dialog-slide-description'
        PaperProps={{
          sx: {
            background: '#1D1D41',
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
          {/* <DialogContentText id='alert-dialog-slide-description'>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button
            type='submit'
            variant='contained'
            // onClick={onClose}
            sx={{ textTransform: 'inherit', fontWeight: 400 }}
          >
            Save
          </Button>
          <Button variant='outlined' color='error' onClick={onClose} sx={{ textTransform: 'inherit', fontWeight: 400 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
