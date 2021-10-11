const ACTION_LOGIN = "@profile/login";
const ACTION_LOGOUT = "@profile/logout";
const ACTION_SET_USERNAME =  "@profile/setUserName";
const ACTION_SET_IMAGE = "@profile/setImage";

export {
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_SET_IMAGE,
  ACTION_SET_USERNAME,
}

export const actionCreator = (type: ProfileActionType,payload: Partial<Profile>) => ({
  type,
  payload
})

export const profileReducer = (state: Profile = {userName: undefined, image: undefined}, action: ProfileAction): Profile => {
  switch(action.type) {
    case ACTION_LOGIN:
      return {
        ...state,
        userName: action.payload.userName,
        image: action.payload.image,
      }
    case ACTION_LOGOUT:
      return {
        userName: "",
        image: "",
      }
    case ACTION_SET_USERNAME:
      return {
        ...state,
        userName: action.payload.userName,
      }
    case ACTION_SET_IMAGE:
      return {
        ...state,
        image: action.payload.image,
      };
    default:
      return state;
  }
}

interface ProfileAction {
  type: ProfileActionType;
  payload: Partial<Profile>;
}

export interface Profile {
  userName: string;
  image: string;
}

export type ProfileActionType = 
  typeof ACTION_LOGIN |
  typeof ACTION_LOGOUT |
  typeof ACTION_SET_USERNAME |
  typeof ACTION_SET_IMAGE
  
