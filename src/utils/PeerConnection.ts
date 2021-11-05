import { Channel, Media } from ".";

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

  async invite(info: Record<string, any>) {
    // create an RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.configuration);
    this.setSelf(peerConnection);
    // add stream to RTCPeerConnection track
    await this.media.getMedia((stream) => {
      this._self.addTrack(stream);
    });
    await this.handleNegotiate(info)
    // 
  }

  private async handleNegotiate(info: Record<string, any>) {
    // create SDP offer
    this._self.createOffer()
    await this.channel.negotiate(this._self, info)
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
  invite: (message?: any) => void;
  addLocalTrack: (stream: MediaStream) => void;
  addRemoteTrack: (stream: MediaStream, cb: Function) => void;
}