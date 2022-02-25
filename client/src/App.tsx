import React, { useEffect } from 'react'
import './App.css'
import Loader from './components/Loader'
import useNotifier from './hooks/useNotifier'
import { AppRouter } from './routes/AppRouter'
import { AuthStatus, fetchAuthMe, selectUserState } from './store/ducks/user/user-slice'
import { useAppDispatch, useAppSelector } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()
  const { isLoggedIn, status } = useAppSelector(selectUserState)
  console.log('status', status)

  useNotifier()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchAuthMe())
    }
  }, [])

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
