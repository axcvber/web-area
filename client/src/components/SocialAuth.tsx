import React from 'react'
import GoogleLogin from 'react-google-login'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { hexToRgbA } from '../utils/hexToRgba'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import useGoogleAuth from '../hooks/useGoogleAuth'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useAppDispatch } from '../store/hooks'
import { fetchGoogleAuth } from '../store/ducks/user/user-slice'
import { BsGithub } from 'react-icons/bs'
import axios from 'axios'

interface ISocialAuth {
  type: 'signIn' | 'signUp'
}

export const SocialAuth: React.FC<ISocialAuth> = ({ type }) => {
  const dispatch = useAppDispatch()
  const responseGoogleError = (response: any) => {
    console.log(response)
  }

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('google response', response)

    if ('accessToken' in response) {
      const accessToken = response.accessToken
      dispatch(fetchGoogleAuth(accessToken))
    }
  }

  const twitterLogin = async () => {
    // const data = await axios.get('http://localhost:5000/api/auth/twitter-auth')

    window.open('http://localhost:5000/api/auth/twitter-auth', '_self')
  }

  return (
    <Wrapper>
      {/* <SocialButton sx={{ color: '#878787', padding: '0' }} variant='contained' fullWidth bgColor='#fff'> */}
      {/* <img src='/google.png' alt='google' />
          <span>{type === 'signIn' ? 'Sign in with Google' : 'Sign up with Google'}</span> */}

      <GoogleLogin
        className='google-btn'
        clientId='624369886084-tre0t6d7udo2spt3cst6rli3e4dc83c4.apps.googleusercontent.com'
        buttonText={type === 'signIn' ? 'Sign in with Google' : 'Sign up with Google'}
        onSuccess={handleSuccess}
        onFailure={responseGoogleError}
        cookiePolicy={'single_host_origin'}
      />
      {/* </SocialButton> */}
      {/* <GoogleLogin
        className='google-btn'
        clientId='624369886084-tre0t6d7udo2spt3cst6rli3e4dc83c4.apps.googleusercontent.com'
        buttonText={type === 'signIn' ? 'Sign in with Google' : 'Sign up with Google'}
        onSuccess={handleSuccess}
        onFailure={responseGoogleError}
        cookiePolicy={'single_host_origin'}
      /> */}

      <SocialButton onClick={twitterLogin} variant='contained' fullWidth bgColor='#1DA1F2'>
        <FaTwitter />
        <span>{type === 'signIn' ? 'Sign in with Twitter' : 'Sign up with Twitter'}</span>
      </SocialButton>
      <SocialButton variant='contained' fullWidth bgColor='#2D333B'>
        <BsGithub />
        <span>{type === 'signIn' ? 'Sign in with Github' : 'Sign up with Github'}</span>
      </SocialButton>
    </Wrapper>
  )
}

const SocialButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ theme, bgColor }) => ({
  backgroundColor: bgColor,
  textTransform: 'inherit',
  fontSize: '16px',
  fontWeight: 400,
  'svg, img': {
    width: 18,
    height: 18,
    marginRight: '12px',
  },
  '&:hover': {
    backgroundColor: hexToRgbA(bgColor),
  },
  margin: '5px 0',
}))

const Wrapper = styled('div')({
  width: '100%',
  '.google-btn': {
    // display: 'none !important',
    margin: '5px 0',
    // display: 'flex',
    justifyContent: 'center',
    width: '100%',
    borderRadius: '3px !important',
    'span': {
      color: '#6D707A',
      fontSize: '16px',
      fontFamily: '"Ubuntu", sans-serif',
      // fontWeight: '400 !important',
    },
  },
})
