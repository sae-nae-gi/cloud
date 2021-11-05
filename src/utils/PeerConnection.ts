import { Channel, Media } from ".";
import { Profile, RoomState } from "../stores";

export class PeerConnection implements Connection {
  private channel: Channel;
  private configuration: RTCConfiguration;
  private _self: RTCPeerConnection;
  private media: Media;

  constructor(channel: Channel, configuration) {
    this.configuration = configuration;
    this.channel = channel;
    this.media = new Media();
  }

  private setSelf(peerConnection: RTCPeerConnection) {
    this._self = peerConnection;
  }

  async invite(info: InviteParams) {
    // create an RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.configuration);
    this.setSelf(peerConnection);
    // add stream to RTCPeerConnection track
    await this.media.getMedia((stream: MediaStream) => {
      stream.getTracks().forEach((localStream) => {
        this._self.addTrack(localStream);
      })
    });
    const combinedOfferInfo = await this.combineOfferInfo(info);
    await this.delegateNegotiate(combinedOfferInfo);
  }

  private async combineOfferInfo(info: InviteParams) {
    const offer = await this._self.createOffer();
    await this._self.setLocalDescription(offer);

    return ({
      ...info,
      sdp: this._self.localDescription,
    })
  }

  // offer, localDescription을 만들어 반대 피어와 소통하는 책임을 Channel에게 위임한다.
  private async delegateNegotiate(info: InviteParams) {
    await this.channel.negotiate(this._self, {
      ...info,
      sdp: this._self.localDescription,
    })
  }

  /**
   * This is the point where we connect the stream we receive from getUserMedia() to the RTCPeerConnection
  */
  addLocalTrack(stream) {
    stream.getTracks().forEach(track => {
      this._self.addTrack(track, stream);
    })
  }

  addRemoteTrack(stream, cb) {
    this._self.addEventListener("track", async (event) => {
      cb(stream, event)
    })
  }

  exChangeNetworkInfo(peerConnection: RTCPeerConnection) {
    peerConnection.onicecandidate = () => {

    };
  }
}

export interface InviteParams extends
  Pick<Profile, "userName">,
  Pick<RoomState, "roomId"> { }

export interface Connection {
  invite: (message: InviteParams) => void;
  addLocalTrack: (stream: MediaStream) => void;
  addRemoteTrack: (stream: MediaStream, cb: Function) => void;
}