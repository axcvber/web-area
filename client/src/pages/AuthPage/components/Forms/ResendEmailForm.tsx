import { LinearProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Line } from '../../../../components/AuthForm'
import { AuthStatus, clearState, selectUserState } from '../../../../store/ducks/user/user-slice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { SwitchLink } from '../../AuthPage'

interface IResendEmailForm {
  title: string
  subtitle: string
  onResendLink: () => void
}

const ResendEmailForm: React.FC<IResendEmailForm> = ({ title, subtitle, onResendLink }) => {
  const { status } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [dispatch])

  return (
    <>
      <div style={{ color: '#fff', textAlign: 'center' }}>
        <img src='/mail.png' width={100} height={100} alt='mail' />
        <Typography variant='h5' sx={{ margin: '10px 0' }}>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        {status === AuthStatus.LOADING ? <LinearProgress sx={{ margin: '15px 0', height: '1px' }} /> : <Line />}
        <Typography variant='body2' sx={{ mt: 1 }}>
          Didn't receive the link? &nbsp;<SwitchLink onClick={onResendLink}>Resend</SwitchLink>
        </Typography>
      </div>
    </>
  )
}

export default ResendEmailForm
