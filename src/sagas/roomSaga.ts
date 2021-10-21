import { call, takeEvery, put, take, all, fork } from "redux-saga/effects";
import {eventChannel, EventChannel } from "redux-saga";
import { socket as cloudSocket} from "../../pages/_app";
import{
  RoomState,
  ACTION_JOIN_ROOM,
  ACTION_LEAVE_ROOM,
  roomActionCreator,
  ACTION_WAIT_JOIN_ROOM,
  ACTION_WAIT_LEAVE_ROOM,
  ACTION_RESET_ROOM,
} from "../stores";

const createRoomChannel = (
  eventType: typeof ACTION_JOIN_ROOM |typeof ACTION_LEAVE_ROOM
) => {
  return eventChannel(
    (emit) => {
      const emitter = (message) => {
        emit(message);  
      }

      const SERVER_PREFIX = "@server/";
      cloudSocket.onListen(`${SERVER_PREFIX}${eventType}`, (response: RoomState) => {
        console.log({type: `${SERVER_PREFIX}${eventType}`, response})
        emitter(response);
      })

      return () => {
        cloudSocket.socket.off(`${SERVER_PREFIX}${eventType}`, emitter);
      }
    }
  )
}

function * waitJoinRoom() {
  let channel;

  try {
    channel = yield call(createRoomChannel, ACTION_JOIN_ROOM);
    fork(closeCreateRoomChannel, channel);
  
    while(true){
      const roomResponse = yield take(channel);
      console.log("joinRoom", {roomResponse})
      yield onJoinRoomResponse(roomResponse);
    }
  }
  catch(e){
    throw Error(e);
  }
  finally {
    if(channel && typeof channel.close === "function"){
      channel.close();
    }
  }
}

/**
 * 방을 나갈 시 기존에 연결되어있던 채널을 닫아야 한다. 
 * @param channel 
 */
function * closeCreateRoomChannel(channel: EventChannel<any>) {
  while(true){
    yield take(ACTION_RESET_ROOM)
    channel.close();
  }
}

function * onJoinRoomResponse(response) {
  yield put(roomActionCreator(ACTION_JOIN_ROOM, response));
}

function * closeLeaveRoomChannel(channel: EventChannel<any>) {
  while(true){
    yield take(ACTION_RESET_ROOM);
    console.log("in closeLeaveRoomChannel")
    channel.close();
  }
}

function * waitLeaveRoom() {
  let channel;
  try {
    channel = yield call(createRoomChannel,ACTION_LEAVE_ROOM);
    fork(closeLeaveRoomChannel, channel);
  
    while(true) {
      const roomResponse = yield take(channel);
      console.log("leaveRoom: ",{leaveRoomResponse: roomResponse});
      yield onLeaveRoomResponse(roomResponse);
    }
  }
  catch (e) {
    throw Error(e);
  }
  finally {
    if(channel && typeof channel.close === "function") {
      channel.close();
    }
  }
}

function * onLeaveRoomResponse(response) {
  yield put(roomActionCreator(ACTION_LEAVE_ROOM, response));
}

export default function * watchRoom() {
  yield all([
    takeEvery(ACTION_WAIT_JOIN_ROOM, waitJoinRoom),
    takeEvery(ACTION_WAIT_LEAVE_ROOM, waitLeaveRoom),
  ])
}