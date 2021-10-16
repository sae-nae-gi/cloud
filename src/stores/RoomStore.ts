import { Profile } from "./ProfileStore";

export interface RoomProfile extends Pick<Profile, "userName"> {
  onView: string;
  onMute: string;
}

export interface RoomState {
  roomId: string;
  users: Profile[];
}

const initialState: RoomState = {
  roomId: "",
  users: [],
} 

export interface RoomActionPayload extends RoomState {
  
}

const ACTION_JOIN_ROOM = "@room/joinUser";
const ACTION_LEAVE_ROOM = "@room/leaveUser";
const ACTION_INITIALIZE_ROOM = "@room/initialize";
const ACTION_RESET_ROOM = "@room/reset"

export interface RoomStoreAction {
  type: RoomActionType;
  payload: RoomActionPayload,
}

export type RoomActionType = 
  typeof ACTION_JOIN_ROOM |
  typeof ACTION_LEAVE_ROOM |
  typeof ACTION_INITIALIZE_ROOM |
  typeof ACTION_RESET_ROOM;

export {
  ACTION_JOIN_ROOM,
  ACTION_LEAVE_ROOM,
  ACTION_INITIALIZE_ROOM,
  ACTION_RESET_ROOM
}

export const roomReducer = (state = initialState, action: Partial<Omit<RoomStoreAction, "type">> & Pick<RoomStoreAction, "type">) => {
  switch(action.type) {
    case ACTION_JOIN_ROOM:
      return {
        ...state,
        users: action.payload.users,
      }
    case ACTION_LEAVE_ROOM:
      return {
        ...state,
        users: action.payload.users,
      }
    case ACTION_INITIALIZE_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
      }
    case ACTION_RESET_ROOM:
      return initialState;
    default: 
      return state;
  }
}

