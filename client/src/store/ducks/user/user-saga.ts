import { AxiosResponse } from 'axios'
import { call, put, race, take, takeEvery } from 'redux-saga/effects'
import AuthApi from '../../../api/AuthApi'
import { AuthResponse, LoginDto, RegisterDto } from '../../../api/interface'
import UserApi from '../../../api/UserApi'
import { IEditProfileForm } from '../../../pages/profile/components/EditProfileForm'
import { hideModal, showModal } from '../modal/modal-slice'
import { setNotify } from '../notify/notify-slice'
import {
  AuthStatus,
  clearState,
  fetchAuthMe,
  fetchConfirmEmail,
  fetchEditProfile,
  fetchForgotPassLink,
  fetchGoogleAuth,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchRemoveProfile,
  fetchResendConfirmLink,
  fetchResetPassword,
  setError,
  setPending,
  setStatus,
  setUserData,
} from './user-slice'

interface IActionWorker<P> {
  type: string
  payload: P
}

export function* fetchLoginWorker({ payload }: IActionWorker<LoginDto>) {
  try {
    yield put(setPending(true))
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.login, payload)
    localStorage.setItem('token', data.currentHashedRefreshToken)
    yield put(setUserData(data))
    yield put(
      setNotify({
        message: 'Successful login',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    yield put(setError(err.response.data.message))
    // yield put(setSignInFail(e.response?.data?.message || 'Some error'))
    // yield put(setSignInValidationError(e.response?.data?.errors))
  }
}

export function* fetchAuthMeWorker() {
  try {
    yield put(setPending(true))
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.authMe)
    localStorage.setItem('token', data.currentHashedRefreshToken)
    yield put(setUserData(data))
  } catch (err: any) {
    console.log(err.response.data.message)
  }
}

export function* fetchLogoutWorker() {
  try {
    yield call(AuthApi.logout)
    localStorage.removeItem('token')
    yield put(clearState())
  } catch (err: any) {
    console.log(err.response.data.message)
  }
}

export function* fetchConfirmEmailWorker({ payload }: IActionWorker<string>) {
  try {
    yield put(setPending(true))
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.confirmEmail, payload)
    localStorage.setItem('token', data.currentHashedRefreshToken)
    yield put(setUserData(data))
    yield put(
      setNotify({
        message: 'Your email has been confirmed',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    console.log(err.response.data.message)
    yield put(setError(err.response.data.message))
  }
}

export function* fetchRegisterWorker({ payload }: IActionWorker<RegisterDto>) {
  try {
    yield put(setStatus(AuthStatus.LOADING))
    yield call(AuthApi.register, payload)
    yield put(setStatus(AuthStatus.SUCCEEDED))
  } catch (err: any) {
    yield put(setError(err.response.data.message))
  }
}

export function* fetchResendConfirmLinkWorker({ payload }: IActionWorker<string>) {
  try {
    yield put(setStatus(AuthStatus.LOADING))
    yield call(AuthApi.resendConfirmLink, payload)
    yield put(setStatus(AuthStatus.SUCCEEDED))
    yield put(
      setNotify({
        message: 'Confirmation link sent successfully',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    yield put(setError(err.response.data.message))
  }
}

export function* fetchGoogleAuthWorker({ payload }: IActionWorker<string>) {
  try {
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.googleAuth, payload)
    console.log('google user data', data)
    localStorage.setItem('token', data.currentHashedRefreshToken)
    yield put(setUserData(data))
    yield put(
      setNotify({
        message: 'Successful login',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    yield put(setError(err.response.data.message))
    // yield put(setSignInFail(e.response?.data?.message || 'Some error'))
    // yield put(setSignInValidationError(e.response?.data?.errors))
  }
}

export function* fetchResetPasswordWorker({ payload }: IActionWorker<{ email: string; password: string }>) {
  try {
    yield put(setStatus(AuthStatus.LOADING))
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.resetPassword, payload)
    localStorage.setItem('token', data.currentHashedRefreshToken)
    yield put(setUserData(data))
    yield put(
      setNotify({
        message: 'Your password was changed',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    yield put(setError(err.response.data.message))
  }
}

export function* fetchForgotPassLinkWorker({ payload }: IActionWorker<string>) {
  try {
    yield put(setStatus(AuthStatus.LOADING))
    yield call(AuthApi.forgotPassword, payload)
    yield put(setStatus(AuthStatus.SUCCEEDED))
    yield put(
      setNotify({
        message: 'Reset link sent successfully',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    yield put(setError(err.response.data.message))

    yield put(
      setNotify({
        message: err.response.data.message,
        options: {
          variant: 'error',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  }
}

export function* fetchEditProfileWorker({ payload }: IActionWorker<IEditProfileForm>) {
  try {
    yield put(setStatus(AuthStatus.LOADING))
    const { data }: AxiosResponse<AuthResponse> = yield call(UserApi.editProfile, payload)
    yield put(setUserData(data))
    yield put(hideModal())
    yield put(
      setNotify({
        message: 'Сhanges applied',
        options: {
          variant: 'success',
          key: new Date().getTime() + Math.random(),
        },
      })
    )
  } catch (err: any) {
    console.log(err)
  }
}

export function* confirmSaga() {
  try {
    yield put(
      showModal({
        title: 'Confirm delete',
        type: 'edit-profile',
      })
    )
    const { yes } = yield race({
      yes: take('CONFIRM'),
      no: take('CANCEL'),
    })
    yield put(hideModal())
    return Boolean(yes)
  } catch (e) {
    console.error(e)
  }
}

function* removeProfile() {
  console.log('here')

  try {
    yield put(
      showModal({
        title: 'Confirm delete',
        type: 'confirm',
      })
    )
    const { yes } = yield race({
      yes: take('CONFIRM'),
      no: take('CANCEL'),
    })
    if (yes) {
      console.log('confirmed')
    }
    yield put(hideModal())
  } catch (e) {
    console.error(e)
  }
}

export function* usersSaga() {
  yield takeEvery(fetchLogin.type, fetchLoginWorker)
  yield takeEvery(fetchLogout.type, fetchLogoutWorker)
  yield takeEvery(fetchAuthMe.type, fetchAuthMeWorker)
  yield takeEvery(fetchConfirmEmail.type, fetchConfirmEmailWorker)
  yield takeEvery(fetchResendConfirmLink.type, fetchResendConfirmLinkWorker)

  yield takeEvery(fetchRegister.type, fetchRegisterWorker)

  yield takeEvery(fetchGoogleAuth.type, fetchGoogleAuthWorker)

  yield takeEvery(fetchResetPassword.type, fetchResetPasswordWorker)

  yield takeEvery(fetchForgotPassLink.type, fetchForgotPassLinkWorker)

  //user
  yield takeEvery(fetchEditProfile.type, fetchEditProfileWorker)

  yield takeEvery(fetchRemoveProfile.type, removeProfile)
}
