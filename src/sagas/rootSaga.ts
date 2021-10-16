import { all } from "redux-saga/effects";
import chatSaga from "./chatSaga";

export const rootSaga = function * (){
  yield all([
    chatSaga,
  ])
}