import { Channel, Media } from ".";
import { InviteParams, NegotiateInfo } from "./types";

export class PeerConnection implements Connection {
  private channel: Channel;
  private configuration: RTCConfiguration;
  private _self: RTCPeerConnection;
  private media: Media;

  constructor(channel: Channel, configuration) {
    this.configuration = configuration;
    this.channel = channel;
    this.media = new Media();

    this.init();
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

  async answer(info: InviteParams) {
    await this.media.getMedia((stream: MediaStream) => {
      this.addLocalTrack(stream);
    });

  }

  async invite(info: InviteParams) {
    // add stream to RTCPeerConnection track
    await this.media.getMedia((stream: MediaStream) => {
      this.addLocalTrack(stream);
    });
    const combinedOfferInfo = await this.combineSendInfo(info, "offer");
    await this.delegateNegotiate(combinedOfferInfo);
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
  private async delegateNegotiate(info: InviteParams) {
    await this.channel.negotiate(this._self, {
      ...info,
      sdp: this._self.localDescription,
    })
  }

  handleMessage(type: "offer" | "answer") {
    return async (info: NegotiateInfo) => {
      const { sdp } = info;
      const description = new RTCSessionDescription(sdp);
      await this._self.setRemoteDescription(description);
      // TODO 데코레이터로 navigator가 있음을 보장하자
      let localStream = await navigator.mediaDevices.getUserMedia()
      this.addLocalTrack(localStream);

      return this.combineSendInfo(info, type)
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
  invite: (message: InviteParams) => void;
  addLocalTrack: (stream: MediaStream) => void;
  addRemoteTrack: (stream: MediaStream, cb: Function) => void;
}