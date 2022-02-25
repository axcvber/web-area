import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes, RouteNames } from '.'
import Loader from '../components/Loader'
import NotFoundPage from '../pages/NotFoundPage'
import { AuthStatus, selectUserState } from '../store/ducks/user/user-slice'
import { useAppSelector } from '../store/hooks'
import PrivateRoute from './PrivateRoute'
// import { useSelector } from 'react-redux'

export const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div style={{ height: '100vh' }}>
          <Loader />
        </div>
      }
    >
      <Routes>
        {publicRoutes.map(({ component: Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {privateRoutes.map(({ component: Component, path, nested }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute redirectTo={RouteNames.AUTH}>
                <Component />
              </PrivateRoute>
            }
          >
            {nested &&
              nested.map(({ component: Component, path }) => <Route key={path} path={path} element={<Component />} />)}
          </Route>
        ))}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
