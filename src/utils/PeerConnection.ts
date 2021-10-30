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

  async makeCall(message?: any) {
    // create an RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.configuration);
    this.setSelf(peerConnection);
    // add stream to RTCPeerConnection track
    await this.media.getMedia((stream) => {
      this._self.addTrack(stream);
    });
    // 
    this.channel.initSignal(peerConnection, message);
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
  makeCall: (message?: any) => void;
  addLocalTrack: (stream: MediaStream) => void;
  addRemoteTrack: (stream: MediaStream, cb: Function) => void;
}