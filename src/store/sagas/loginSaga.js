import { put, takeEvery } from "redux-saga/effects";
import { loginApi } from "../../api";
import { userlogin } from "../silces/userSlice";
import { POST_LOGIN_JWT } from "../types/type";
import { toast } from 'react-toastify';

export function* handleLogin(action) {
  try {
    const { data } = yield loginApi(action.payload);
   yield put(userlogin(data));
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* watchLoginSaga() {
  yield takeEvery(POST_LOGIN_JWT, handleLogin);
}

export default watchLoginSaga;
