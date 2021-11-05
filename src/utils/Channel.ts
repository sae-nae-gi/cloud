import CloudSocket, { MessageAction } from "./socket";

export const signalType = {
  serverOffer: "@server/offer",
  clientOffer: "@client/offer",
  serverAnswer: "@server/answer",
  clientAnswer: "@client/answer",
  iceCandidate: "@server/newIceCandidate",
}

export class SignalingChannel implements Channel {
  private channel: CloudSocket;

  constructor(socketIo: CloudSocket) {
    this.channel = socketIo;
  }

  async negotiate(peerConnection: RTCPeerConnection, info: Record<string, any>) {
    this.onServerOffer(async ({ answer }) => {
      if (answer) {
        const remoteDesc = new RTCSessionDescription(answer);
        await peerConnection.setLocalDescription(remoteDesc);
      }
    });
    this.onServerAnswer(async ({ }) => {

    });
    this.sendOffer({
      type: signalType.clientOffer, payload: info
    });
  }

  // send the offer through the signaling server
  private sendOffer(action: MessageAction) {
    this.send(action);
  }

  send(action: MessageAction) {
    this.channel.emit(action);
  }

  onServerAnswer(cb: (message: any) => void) {
    this.channel.onListen(signalType.serverAnswer, cb);
  }

  onServerOffer(cb: (message: any) => void) {
    this.channel.onListen(signalType.serverOffer, cb);
  }
}

export interface Channel {
  // peerConnection을 주입받아 Signaling Channel와 소통하는 책임을 맡음
  negotiate: (peerConnection: RTCPeerConnection, message?: any) => void;
  send: (event: any) => void;
}