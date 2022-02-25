import React, { ReactElement, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { AuthStatus, fetchAuthMe, selectUserState } from '../store/ducks/user/user-slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface IPrivateRoute {
  children: ReactElement
  redirectTo: string
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, redirectTo }) => {
  const { isLoggedIn } = useAppSelector(selectUserState)
  const location = useLocation()
  if (localStorage.getItem('token') && !isLoggedIn) {
    return null
  }

  return isLoggedIn ? children : <Navigate to={redirectTo} state={{ from: location }} replace />
}

export default PrivateRoute
