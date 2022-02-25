import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthField } from '../AuthField'
import { Button, Typography } from '@mui/material'
import { SwitchLink } from '../../AuthPage'
import AuthForm from '../../../../components/AuthForm'
import ResendEmailForm from './ResendEmailForm'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { AuthStatus, fetchForgotPassLink, selectUserState } from '../../../../store/ducks/user/user-slice'

interface IResetForm {
  switchToSignIn: () => void
}

const ResetFormSchema = yup
  .object({
    email: yup.string().email('Please enter a valid email address.').required('Please enter a email address.'),
  })
  .required()

export const ResetForm: React.FC<IResetForm> = ({ switchToSignIn }) => {
  const { status } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const [formStep, setFormStep] = useState(0)
  const { control, handleSubmit, getValues } = useForm<{ email: string }>({
    resolver: yupResolver(ResetFormSchema),
  })
  const isLoading = status === AuthStatus.LOADING

  useEffect(() => {
    if (status === AuthStatus.SUCCEEDED) {
      setFormStep(1)
    }
  }, [status, dispatch])

  const onSubmit: SubmitHandler<{ email: string }> = (formData) => {
    dispatch(fetchForgotPassLink(formData.email))
  }

  const onResendLink = (email: string) => {
    dispatch(fetchForgotPassLink(email))
  }

  // Enter the email associated with your account and we'll send an email with instructions to reset your password.
  return (
    <>
      {formStep === 0 && (
        <AuthForm
          title='Forgot your password?'
          subtitle='Enter your registered email below to receive password reset instruction.'
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <div style={{ margin: '10px 0' }}>
              <AuthField control={control} name='email' label='Email' type='email' />
            </div>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Send'}
            </Button>
            <Typography color='white' align='center' variant='body2' sx={{ mt: 2, fontSize: '13px' }}>
              Remember password? &nbsp;<SwitchLink onClick={switchToSignIn}>Log in</SwitchLink>
            </Typography>
          </>
        </AuthForm>
      )}
      {formStep === 1 && (
        <ResendEmailForm
          title={`Reset link has been sent to ${getValues('email')}!`}
          subtitle='Please check your inbox and click in the received link to reset a password.'
          onResendLink={() => onResendLink(getValues('email'))}
        />
      )}
    </>
  )
}
