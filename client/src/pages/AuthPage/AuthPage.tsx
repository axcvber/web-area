import React, { ReactChild, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Logo } from '../../components/Logo'
import { SocialAuth } from '../../components/SocialAuth'
import { LoginForm } from './components/Forms/LoginForm'
import { RegisterForm } from './components/Forms/RegisterForm'
import { ResetForm } from './components/Forms/ResetForm'
import { CSSTransition } from 'react-transition-group'
import { selectUserState } from '../../store/ducks/user/user-slice'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { RouteNames } from '../../routes'

const AuthPage = () => {
  const [form, setForm] = useState<'signIn' | 'signUp' | 'reset'>('signIn')
  const { isLoggedIn, isPending } = useAppSelector(selectUserState)

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/')
  //   }
  // }, [isAuth, navigate])

  const switchToSignUp = () => {
    setForm('signUp')
  }

  const switchToSignIn = () => {
    setForm('signIn')
  }

  const switchToReset = () => {
    setForm('reset')
  }

  if (isLoggedIn) {
    return <Navigate to={RouteNames.CHAT} replace />
  }

  return (
    <Wrapper>
      <AuthCart>
        {form === 'signIn' && <LoginForm switchToSignUp={switchToSignUp} switchToReset={switchToReset} />}
        {form === 'signUp' && <RegisterForm switchToSignIn={switchToSignIn} />}
        {form === 'reset' && <ResetForm switchToSignIn={switchToSignIn} />}
      </AuthCart>
    </Wrapper>
  )
}
export default AuthPage

interface IDynamicForm {
  socialAuthType?: 'signIn' | 'signUp'
  title: string
  children: ReactChild
}

const DynamicForm: React.FC<IDynamicForm> = ({ socialAuthType, title, children }) => {
  return (
    <>
      <CartHeader>
        <Logo />
        <Typography color='white' align='center' sx={{ mt: 2 }}>
          {title}
        </Typography>
      </CartHeader>
      <CartBody>{children}</CartBody>
      {socialAuthType && (
        <CartFooter>
          <Line>
            <OR>OR</OR>
          </Line>
          <SocialAuth type={socialAuthType} />
        </CartFooter>
      )}
    </>
  )
}

export const SwitchLink = styled('span')({
  color: '#524EED',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    // borderColor: '#524EED',
  },
})

const Line = styled('div')({
  margin: '15px 0',
  width: '100%',
  position: 'relative',
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: '100%',
    height: '1px',
    background: '#969696',
  },
})

const OR = styled('span')({
  color: '#969696',
  position: 'relative',
  fontSize: '14px',
  width: '100%',
  background: '#141332',
  zIndex: 2,
  padding: '0 10px',
})

const CartFooter = styled('div')({
  width: '100%',
  textAlign: 'center',
})

const CartBody = styled('div')({})

const CartHeader = styled('header')({})

export const AuthCart = styled('div')(({ theme }) => ({
  width: '380px',
  backgroundColor: theme.palette.background.paper,
  padding: '25px 35px',
  borderRadius: '30px',
  boxShadow: '-7px 7px 10px -5px rgba(0, 0, 0, 0.23)',
  transition: 'all 0.4s ease-in-out',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}))

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  position: 'relative',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
})
