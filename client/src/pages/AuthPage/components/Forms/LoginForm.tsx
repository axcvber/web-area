import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { AuthField } from '../AuthField'
import { LoginDto } from '../../../../api/interface'
import { useSnackbar } from 'notistack'
import { clearState, fetchLogin, selectUserState } from '../../../../store/ducks/user/user-slice'
import { SwitchLink } from '../../AuthPage'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import AuthForm from '../../../../components/AuthForm'

const LoginSchema = yup
  .object({
    email: yup.string().email('Please enter a valid email address.').required('Please enter a email address.'),
    password: yup.string().trim().max(36, 'Maximum of 36 characters.').required('Please enter a password.'),
  })
  .required()

interface ILoginForm {
  switchToSignUp: () => void
  switchToReset: () => void
}

export const LoginForm: React.FC<ILoginForm> = ({ switchToSignUp, switchToReset }) => {
  const {
    control,
    handleSubmit,
    formState: { submitCount },
  } = useForm<LoginDto>({
    resolver: yupResolver(LoginSchema),
  })
  const { isError, errorMessage, isPending, isLoggedIn } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
      dispatch(clearState())
    }
  }, [submitCount, isError, errorMessage, enqueueSnackbar, dispatch])

  const onSubmit: SubmitHandler<LoginDto> = (formData) => {
    dispatch(fetchLogin(formData))
  }

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} title='Log in to continue' socialAuthType='signIn'>
      <>
        <div style={{ margin: '10px 0' }}>
          <AuthField control={control} name='email' label='Email' type='email' />
          <AuthField control={control} name='password' label='Password' type='password' />
          <Typography color='white' variant='body2' sx={{ fontSize: '13px' }}>
            <SwitchLink style={{ color: '#fff' }} onClick={switchToReset}>
              Forgot password?
            </SwitchLink>
          </Typography>
        </div>

        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Continue'}
        </Button>
        <Typography color='white' variant='body2' sx={{ margin: '10px 0', fontSize: '13px' }}>
          Don't have an account? &nbsp;<SwitchLink onClick={switchToSignUp}>Sign up</SwitchLink>
        </Typography>
      </>
    </AuthForm>
  )
}
