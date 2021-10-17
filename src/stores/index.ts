import { createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "../sagas/rootSaga";
import {profileReducer, Profile} from "./ProfileStore";
import {roomReducer, RoomState} from "./RoomStore";
import {chatReducer, ChatState} from "./ChatStore";

const sagaMiddleware = createSagaMiddleware();

export interface RootStore {
  profile: Profile;
  room: RoomState;
  chat: ChatState;
}

const rootStore = combineReducers<RootStore>({
  profile: profileReducer,
  room: roomReducer,
  chat: chatReducer,
})

export type RootState = ReturnType<typeof rootStore>;

export const appStore = createStore(
  rootStore,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);


export * from "./ChatStore";
export * from "./ProfileStore";
export * from "./RoomStore"; 
export * from "./SocketStore";