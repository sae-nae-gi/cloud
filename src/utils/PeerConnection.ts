import { Channel } from ".";

export class PeerConnection implements Connection {
  private channel: Channel;
  private configuration: RTCConfiguration;
  private _self: RTCPeerConnection;

  constructor(channel: Channel, configuration) {
    this.configuration = configuration;
    this.channel = channel;
  }

  private setSelf(peerConnection: RTCPeerConnection) {
    this._self = peerConnection;
  }

  makeCall() {
    const peerConnection = new RTCPeerConnection(this.configuration);
    this.setSelf(peerConnection);
    this.channel.initSignal(peerConnection);
  }

  /**
   * This is the point where we connect the stream we receive from getUserMedia() to the RTCPeerConnection
  */
  addLocalTrack(stream) {
    stream.getTracks().forEach(track => {
      this._self.addTrack(track,stream);
    })
  }

  addRemoteTrack(stream, cb) {
    this._self.addEventListener("track", async (event) => {
      cb(stream,event)
    })
  }

  exChangeNetworkInfo(peerConnection: RTCPeerConnection) {
    peerConnection.onicecandidate = () => {

    };
  }
}

export interface Connection {
  makeCall: () => void;
  addLocalTrack: (stream: MediaStream) => void;
  addRemoteTrack: (stream: MediaStream, cb: Function) => void;
}