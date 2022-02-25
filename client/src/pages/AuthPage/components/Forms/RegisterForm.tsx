import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthField } from '../AuthField'
import { Button, LinearProgress, Typography } from '@mui/material'
import { RegisterDto } from '../../../../api/interface'
import { SwitchLink } from '../../AuthPage'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { useSnackbar } from 'notistack'
import {
  clearState,
  fetchRegister,
  selectUserState,
  AuthStatus,
  fetchResendConfirmLink,
} from '../../../../store/ducks/user/user-slice'
import AuthForm, { Line } from '../../../../components/AuthForm'
import ResendEmailForm from './ResendEmailForm'

const RegisterSchema = yup
  .object({
    email: yup.string().email('Please enter a valid email address.').required('Please enter a email address.'),
    fullName: yup.string().required('Please enter your Full Name.'),
    username: yup.string().required('Please enter your Username.'),
    password: yup.string().trim().max(36, 'Maximum of 36 characters.').required('Please enter a password.'),
  })
  .required()

interface IRegisterForm {
  switchToSignIn: () => void
}

export const RegisterForm: React.FC<IRegisterForm> = ({ switchToSignIn }) => {
  const {
    control,
    handleSubmit,
    formState: { submitCount },
    getValues,
  } = useForm<RegisterDto>({
    resolver: yupResolver(RegisterSchema),
  })

  const { isError, errorMessage, status } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [formStep, setFormStep] = useState(0)

  const isLoading = status === AuthStatus.LOADING

  useEffect(() => {
    if (status === AuthStatus.SUCCEEDED) {
      setFormStep(1)
    }
  }, [status, dispatch])

  //remove
  useEffect(() => {
    if (isError) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
      dispatch(clearState())
    }
  }, [submitCount, isError, errorMessage, enqueueSnackbar, dispatch])

  const onResendLink = () => {
    if (!isLoading) {
      dispatch(fetchResendConfirmLink('cjmc0675@gmail.com'))
    }
  }

  const onSubmit: SubmitHandler<RegisterDto> = (formData) => {
    dispatch(fetchRegister(formData))
  }
  return (
    <>
      {formStep === 0 && (
        <AuthForm onSubmit={handleSubmit(onSubmit)} title='Sign up to continue' socialAuthType='signUp'>
          <>
            <div style={{ margin: '8px 0' }}>
              <AuthField control={control} name='email' label='Email' type='email' />
              <AuthField control={control} name='fullName' label='Full Name' />
              <AuthField control={control} name='username' label='Username' />
              <AuthField control={control} name='password' label='Password' type='password' />
            </div>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </Button>

            <Typography color='white' variant='body2' sx={{ margin: '10px 0', fontSize: '13px' }}>
              Already have an account? &nbsp;<SwitchLink onClick={switchToSignIn}>Sign in</SwitchLink>
            </Typography>
          </>
        </AuthForm>
      )}
      {formStep === 1 && (
        <ResendEmailForm
          title='Email Confirmation'
          subtitle={`We have sent email to ${getValues(
            'email'
          )} to confirm the validity of our email address. After receiving the email follow the link provided to complete
        you registration.`}
          onResendLink={onResendLink}
        />
      )}
    </>
  )
}
