import {call, takeEvery, put, take, fork} from "redux-saga/effects";
import { EventChannel, eventChannel } from "redux-saga";
import { socket as cloudSocket } from "../../pages/_app";
import {
  RoomState,
  ACTION_WAIT_CHAT,
  ACTION_SEND_CHAT,
  ACTION_UPDATE_CHAT,
  ACTION_JOIN_CHAT,
  ACTION_LEAVE_CHAT,
  Chat,
  chatActionCreator,
  ACTION_RESET_CHAT,
} from "../stores"

const createSocketChannel = (eventType: typeof ACTION_SEND_CHAT) => {
  return eventChannel(
    // TODO 타입 수정
    (emit) => {
      const emitter = (message) => {
        emit(message);
      }

      const SERVER_PREFIX = "@server/";
      cloudSocket.onListen(`${SERVER_PREFIX}${eventType}`, (response: Chat & RoomState["roomId"]) => {
        emitter(response);
      });

      return () => {
        cloudSocket.socket.off(`${SERVER_PREFIX}${eventType}`, emitter);
      }
    }
  )
}

function * closeSocketChannel(socketChannel: EventChannel<any>) {
  while(true){
    yield take(ACTION_RESET_CHAT);
    socketChannel.close();
  }
}

function * waitChat() {
  let channel;

  try {
    channel = yield call(createSocketChannel, ACTION_SEND_CHAT);
    yield fork(closeSocketChannel, channel);
  
    while(true){
      const chatResponse = yield take(channel);
      yield onSendChatResponse(chatResponse);
    }
  }
  catch (e){
    throw Error(e);
  }
  finally {
    if(channel && typeof channel.close === "function"){
      channel.close();
    }
  }
}

function * onSendChatResponse(response) {
  yield put(chatActionCreator(ACTION_UPDATE_CHAT,response))
}

export default function * watchChatSend() {
  yield takeEvery(ACTION_WAIT_CHAT, waitChat);
}