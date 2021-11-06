import { Channel, Media } from ".";
import { InviteParams, NegotiateInfo } from "./types";

export class PeerConnection implements Connection {
  private channel: Channel;
  private configuration: RTCConfiguration;
  private _self: RTCPeerConnection;
  private media: Media;
  private myInfo: InviteParams;

  constructor(channel: Channel, configuration) {
    this.configuration = configuration;
    this.channel = channel;
    this.media = new Media();

    this.init();
  }

  get hasMedia() {
    return typeof this.media !== "undefined";
  }

  private init() {
    // create an RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.configuration);
    this.setSelf(peerConnection);
    this.channel.activateListener({
      handleOfferMessage: this.handleMessage("offer"),
      handleAnswerMessage: this.handleMessage("answer"),
    })
  }

  private setSelf(peerConnection: RTCPeerConnection) {
    this._self = peerConnection;
  }

  private setMyInfo(myInfo: InviteParams) {
    this.myInfo = myInfo;
  }

  async answer(info: InviteParams) {
    // add stream to RTCPeerConnection track
    const combinedOfferInfo = await this.combineSendInfo(info, "answer");
    await this.delegateNegotiate(combinedOfferInfo, "answer");
  }

  async invite(info: InviteParams) {
    this.setMyInfo(info);
    await this.media.getMedia();
    // add stream to RTCPeerConnection track
    this.addLocalTrack(this.media.getStream());
    const combinedOfferInfo = await this.combineSendInfo(info, "offer");
    await this.delegateNegotiate(combinedOfferInfo, "offer");
  }

  private async combineSendInfo(info: InviteParams, type: "offer" | "answer"): Promise<NegotiateInfo> {
    let sessionDescriptionInit;
    sessionDescriptionInit = type === "offer"
      ? await this._self.createOffer()
      : await this._self.createAnswer();
    await this._self.setLocalDescription(sessionDescriptionInit);

    return ({
      ...info,
      sdp: this._self.localDescription,
    })
  }

  // offer, localDescription을 만들어 반대 피어와 소통하는 책임을 Channel에게 위임한다.
  private async delegateNegotiate(info: InviteParams, type: "offer" | "answer") {
    await this.channel.negotiate({
      ...info,
      sdp: this._self.localDescription,
    }, type)
  }

  handleMessage(type: "offer" | "answer") {
    return async (info: NegotiateInfo) => {
      const { sdp } = info;
      const description = new RTCSessionDescription(sdp);
      await this._self.setRemoteDescription(description);
      // TODO 데코레이터로 navigator가 있음을 보장하자
      // @server/offer를 받았을 때는 @client/answer를 준비해야 한다.
      if (type === "offer") {
        return this.combineSendInfo(info, "answer")
      }
      else {
        return Promise.resolve({} as NegotiateInfo);
      }
    }
  }

  async handleAnswerMessage(info: NegotiateInfo) {
    const { sdp } = info;
    const description = new RTCSessionDescription(sdp);
    await this._self.setRemoteDescription(description);
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


export interface Connection {
  hasMedia: boolean;
  invite: (message: InviteParams) => void;
  addLocalTrack: (stream: MediaStream) => void;
  addRemoteTrack: (stream: MediaStream, cb: Function) => void;
}