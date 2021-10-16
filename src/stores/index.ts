import { createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "../sagas/rootSaga";
import {profileReducer} from "./ProfileStore";
import {roomReducer} from "./RoomStore";
import {chatReducer} from "./ChatStore";

const sagaMiddleware = createSagaMiddleware();

const rootStore = combineReducers({
  profile: profileReducer,
  room: roomReducer,
  chat: chatReducer,
})

export const appStore = createStore(
  rootStore,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);


export * from "./ChatStore";
export * from "./ProfileStore";
export * from "./RoomStore"; 
export * from "./SocketStore";