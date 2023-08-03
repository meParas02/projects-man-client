import { resistrationApi } from "../../api";
import { userResistration } from "../silces/userSlice";
import { POST_RESISTRATION } from "../types/type";
import { put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

export function* handleResistration(action) {
  try {
    const { data } = yield resistrationApi(action.payload);
    yield put(userResistration(data));
  } catch (error) { 
    toast.error(error.response.data);
  }
}

function* watchResistrationSaga() {
  yield takeLatest(POST_RESISTRATION, handleResistration);
}

export default watchResistrationSaga;
