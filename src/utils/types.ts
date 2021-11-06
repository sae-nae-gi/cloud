import { Profile, RoomState } from "../stores";

export interface InviteParams extends
  Pick<Profile, "userName">,
  Pick<RoomState, "roomId"> { }

export interface NegotiateInfo extends InviteParams {
  sdp: RTCSessionDescription;
}