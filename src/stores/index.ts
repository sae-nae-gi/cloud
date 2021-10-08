import { createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "../sagas/rootSaga";
import {profileReducer} from "./ProfileStore";

const sagaMiddleware = createSagaMiddleware();

const rootStore = combineReducers({
  profile: profileReducer,
})

export const appStore = createStore(
  rootStore,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
