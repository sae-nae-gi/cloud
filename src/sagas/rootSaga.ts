import { all } from "redux-saga/effects";
import chatSaga from "./chatSaga";
import roomSaga from "./roomSaga";

export const rootSaga = function * (){
  yield all([
    chatSaga(),
    roomSaga(),
  ])
}