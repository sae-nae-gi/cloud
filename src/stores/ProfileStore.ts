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

export const profileReducer = (state: Profile, action: ProfileAction): Profile => {
  switch(action.type) {
    case ACTION_LOGIN:
    case ACTION_LOGOUT:
    case ACTION_SET_USERNAME:
    case ACTION_SET_IMAGE:
      return {
        ...state,
        ...action.payload
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
  
