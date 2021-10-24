import CloudSocket, { MessageAction } from "./socket";

const signalType = {
  serverSignal: "@server/signalChannel",
  clientSignal: "@cleint/signalChannel",
}

export class SignalingChannel implements Channel {
  private channel: CloudSocket;

  constructor(socketIo: CloudSocket){
    this.channel = socketIo;
  }

  async initSignal(peerConnection: RTCPeerConnection) {
    this.onServerSignaling( async ({answer}) => {
      if(answer) {
        const remoteDesc = new RTCSessionDescription(answer);
        await peerConnection.setLocalDescription(remoteDesc);
      }
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    this.send({ type: signalType.clientSignal, payload: null });
  }

  send(action: MessageAction) {
    this.channel.emit(action);
  }

  onServerSignaling(cb: (message: any) => void) {
    this.channel.onListen(signalType.serverSignal, cb);
  }
}

export interface Channel {
  initSignal: (peerConnection: RTCPeerConnection) => void;
  send: (event: any) => void;
}