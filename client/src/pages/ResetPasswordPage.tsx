import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import AuthForm from '../components/AuthForm'
import { AuthField } from './AuthPage/components/AuthField'
import { Button } from '@mui/material'
import { AuthCart } from './AuthPage/AuthPage'
import jwt_decode from 'jwt-decode'
import useQuery from '../hooks/useQuery'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchResetPassword, selectUserState } from '../store/ducks/user/user-slice'
import { useNavigate } from 'react-router-dom'

const ResetPasswordSchema = yup
  .object({
    password: yup.string().required('Please enter a new password.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm a new password.'),
  })
  .required()

const ResetPasswordPage = () => {
  const query = useQuery()
  const queryToken = query.get('token')
  const [email, setEmail] = useState<string>('')
  const { isLoggedIn, isPending, isError, errorMessage } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //TOKEN CHECK

  useEffect(() => {
    if (queryToken) {
      const { email }: any = jwt_decode(queryToken)
      if (email) {
        setEmail(email)
        console.log(email)
      } else {
        console.log('error')
      }
      // dispatch(fetchConfirmEmail(token))
    } else {
      // navigate('/', { replace: true })
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const {
    control,
    handleSubmit,
    formState: { submitCount },
    getValues,
  } = useForm<any>({
    resolver: yupResolver(ResetPasswordSchema),
  })

  const onSubmit: SubmitHandler<{ password: string }> = (formData) => {
    console.log({ email, password: formData.password })
    dispatch(fetchResetPassword({ email, password: formData.password }))
  }

  return (
    <AuthCart>
      <AuthForm
        onSubmit={handleSubmit(onSubmit)}
        title='Set new password'
        subtitle='Your new password must be different to previously used passwords.'
      >
        <>
          <div style={{ margin: '15px 0' }}>
            <AuthField control={control} name='password' label='Password' type='password' />
            <AuthField control={control} name='confirmPassword' label='Confirm Password' type='password' />
          </div>

          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ textTransform: 'inherit', fontSize: 16, fontWeight: 400 }}
            // disabled={isLoading}
          >
            Reset password
            {/* {isLoading ? 'Processing...' : 'Sign Up'} */}
          </Button>

          {/* <Typography color='white' variant='body2' sx={{ margin: '10px 0', fontSize: '13px' }}>
        Already have an account? &nbsp;<SwitchLink onClick={switchToSignIn}>Sign in</SwitchLink>
      </Typography> */}
        </>
      </AuthForm>
    </AuthCart>
  )
}

export default ResetPasswordPage
