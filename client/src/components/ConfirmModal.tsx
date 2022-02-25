import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../store/hooks'

const ConfirmModal = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <p style={{ marginBottom: '20px' }}>Are you shure?</p>
      <Button size='small' variant='contained' color='error' onClick={() => dispatch({ type: 'CONFIRM' })}>
        Remove
      </Button>
      <Button size='small' variant='outlined' color='error' onClick={() => dispatch({ type: 'CANCEL' })}>
        Close
      </Button>
    </div>
  )
}

export default ConfirmModal
