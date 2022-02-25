import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearState, fetchConfirmEmail, selectUserState } from '../store/ducks/user/user-slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { styled } from '@mui/material/styles'
import { Button, Typography, Box } from '@mui/material'
import Loader from '../components/Loader'
import useQuery from '../hooks/useQuery'

const ConfirmEmailPage = () => {
  const { isLoggedIn, isPending, isError, errorMessage } = useAppSelector(selectUserState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const token = query.get('token')
  console.log('token', token)

  useEffect(() => {
    if (token) {
      dispatch(fetchConfirmEmail(token))
    } else {
      navigate('/', { replace: true })
    }
  }, [])

  if (isPending) {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <Loader />
      </div>
    )
  }

  return (
    <Wrapper>
      {isError && (
        <Box
          sx={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <div>
            <img style={{ display: 'block' }} width={200} height={200} src='/email-error.png' alt='mail' />
          </div>
          <Typography variant='h4' color='white' sx={{ mt: 1, mb: 1 }}>
            Opps!
          </Typography>
          <Typography color='white' sx={{ mt: 1, mb: 3, fontSize: 20 }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
      {isLoggedIn && (
        <Box
          sx={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <div>
            <img style={{ display: 'block' }} width={200} height={200} src='/email.png' alt='mail' />
          </div>
          <Typography variant='h4' color='white' sx={{ mt: 1, mb: 1 }}>
            Congratulations!
          </Typography>
          <Typography color='white' sx={{ mt: 1, mb: 3, fontSize: 20 }}>
            Thanks for confirmation email address. You can start chatting.
          </Typography>
          <Link to='/'>
            <Button variant='contained'>Start chatting</Button>
          </Link>
        </Box>
      )}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export default ConfirmEmailPage
