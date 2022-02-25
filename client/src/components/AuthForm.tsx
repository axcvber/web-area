import React, { ReactChild } from 'react'
import { styled } from '@mui/material/styles'
import { Logo } from './Logo'
import { Typography } from '@mui/material'
import { SocialAuth } from './SocialAuth'

interface IAuthForm {
  socialAuthType?: 'signIn' | 'signUp'
  title: string
  children: ReactChild
  subtitle?: string
  onSubmit: () => void
}

const AuthForm: React.FC<IAuthForm> = ({ title, subtitle, onSubmit, socialAuthType, children }) => {
  return (
    <>
      <CartHeader>
        <Logo />
        <Typography component='h1' color='white' variant='h6' align='center' sx={{ mt: 1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography color='white' variant='body2' align='center' sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CartHeader>
      <CartBody onSubmit={onSubmit}>{children}</CartBody>
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

export const Line = styled('div')({
  margin: '15px 0',
  width: '100%',
  height: '1px',
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

const CartBody = styled('form')({})

const CartHeader = styled('header')({})

export default AuthForm
