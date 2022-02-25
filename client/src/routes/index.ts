import { ComponentType, lazy, LazyExoticComponent } from 'react'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import AuthPage from '../pages/AuthPage/AuthPage'
import ChatPage from '../pages/ChatPage/ChatPage'

export interface IRoute {
  path: string
  component: LazyExoticComponent<ComponentType> | any
  nested?: Array<{ path: string; component: LazyExoticComponent<ComponentType> | any }>
}

export enum RouteNames {
  CHAT = '/',
  AUTH = '/auth',
  CONFIRM_EMAIL = '/confirm-email',
  RESET_PASSWORD = '/reset-password',
  TEST = '/test',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.AUTH,
    component: lazy(() => import('../pages/AuthPage/AuthPage')),
  },
  {
    path: RouteNames.CONFIRM_EMAIL,
    component: lazy(() => import('../pages/ConfirmEmailPage')),
  },
  {
    path: RouteNames.RESET_PASSWORD,
    component: lazy(() => import('../pages/ResetPasswordPage')),
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.CHAT,
    component: lazy(() => import('../pages/ChatPage/ChatPage')),

    nested: [
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: 'settings',
        component: Settings,
      },
    ],
  },
  {
    path: RouteNames.TEST,
    component: lazy(() => import('../pages/TestPage')),
  },
]
