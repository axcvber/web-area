import { Button, Stack } from '@mui/material'
import React from 'react'
import { useHideModal } from '../hooks/modal-hook'
import { useAppDispatch } from '../store/hooks'

interface IModalButtons {
  successBtn?: () => void
}

const ModalButtons: React.FC<IModalButtons> = ({ successBtn }) => {
  const { handleOnClose } = useHideModal()

  return (
    <Stack direction='row' spacing={1} justifyContent='flex-end' mt={1}>
      <Button
        type='submit'
        variant='contained'
        sx={{ textTransform: 'inherit', fontWeight: 400 }}
        // disabled={status === AuthStatus.LOADING}
        onClick={successBtn}
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
    </Stack>
  )
}

export default ModalButtons
