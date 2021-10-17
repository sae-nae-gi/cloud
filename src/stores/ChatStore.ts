import { Profile } from ".";

// 채팅을 기다림
const ACTION_WAIT_CHAT = "@chat/wait";
// 메시지를 보냄
const ACTION_SEND_CHAT = "@chat/send";
// 메시지를 업데이트 함
const ACTION_UPDATE_CHAT = "@chat/update";
// 새로운 유저가 채팅에 참여함
const ACTION_JOIN_CHAT = "@chat/join";
// 유저가 채팅에서 나감
const ACTION_LEAVE_CHAT = "@chat/leave";
// 채팅 메세지 리셋
const ACTION_RESET_CHAT = "@chat/reset";

export {
  ACTION_WAIT_CHAT,
  ACTION_SEND_CHAT,
  ACTION_UPDATE_CHAT,
  ACTION_JOIN_CHAT,
  ACTION_LEAVE_CHAT,
  ACTION_RESET_CHAT,
}

export interface ChatAction {
  type: typeof ACTION_SEND_CHAT
    | typeof ACTION_UPDATE_CHAT
    | typeof ACTION_JOIN_CHAT
    | typeof ACTION_LEAVE_CHAT
    | typeof ACTION_RESET_CHAT
    | typeof ACTION_WAIT_CHAT;
  payload: Chat & Pick<ChatState,"roomId">;
}

export interface Chat extends Pick<Profile, "userName"> {
  message: string;
}

export interface ChatState {
  roomId: string;
  chat: Chat[];
}


export const chatActionCreator = (type: ChatAction["type"], payload?: Chat) => ({
  type,
  payload,
})

const initialState: ChatState = {
  roomId: "",
  chat: [],
};

export const chatReducer = (prevState: ChatState = initialState, action: ChatAction) => {
  switch(action.type){
    case ACTION_UPDATE_CHAT:
    case ACTION_JOIN_CHAT:
    case ACTION_LEAVE_CHAT:
      return {
        ...prevState,
        chat: prevState.chat.concat({
          userName: action.payload?.userName,
          message: action.payload?.message,
        }),
      }
    case ACTION_RESET_CHAT:
      return initialState;
    default:
      return prevState;
  }
}

