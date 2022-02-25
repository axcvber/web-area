import { all } from 'redux-saga/effects'
import { usersSaga } from './ducks/user/user-saga'

export default function* rootSaga() {
  yield all([usersSaga()])
}
