import CloudSocket, { MessageAction } from "./socket";

const signalType = {
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

  async initSignal(peerConnection: RTCPeerConnection, message?: any) {
    this.onServerOffer(async ({ answer }) => {
      if (answer) {
        const remoteDesc = new RTCSessionDescription(answer);
        await peerConnection.setLocalDescription(remoteDesc);
      }
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    this.send({ type: signalType.clientOffer, payload: message });
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
  initSignal: (peerConnection: RTCPeerConnection, message?: any) => void;
  send: (event: any) => void;
}