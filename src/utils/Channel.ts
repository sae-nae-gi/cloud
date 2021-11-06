import CloudSocket, { MessageAction } from "./socket";
import { NegotiateInfo } from "./types";

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

  async negotiateOffer(info: NegotiateInfo, type: "offer" | "answer") {
    // this.onServerOffer(async ({ answer }) => {
    //   if (answer) {
    //     const remoteDesc = new RTCSessionDescription(answer);
    //     await peerConnection.setLocalDescription(remoteDesc);
    //   }
    // });
    // this.onServerAnswer(async ({ }) => {

    // });
    this.sendOffer({
      type: type === "offer"
        ? signalType.clientOffer
        : signalType.clientAnswer,
      payload: info,
    });
  }


  activateListener(handler: {
    handleOfferMessage: (info: NegotiateInfo) => Promise<NegotiateInfo>,
  }) {
    this.onReceiveServerOffer(handler.handleOfferMessage)
  }

  private onReceiveServerOffer(infoHandler: ActivateListenerHandler["handleOfferMessage"]) {
    this.channel.onListen(signalType.serverOffer, (info: NegotiateInfo) => {
      infoHandler(info)
        .then((combinedOfferInfo) => {
          this.sendOffer({
            type: signalType.clientAnswer,
            payload: combinedOfferInfo,
          });
        })
    })
  }

  private onReceiveServerAnswer(infoHandler: (info: NegotiateInfo) => Promise<NegotiateInfo>) {
    this.channel.onListen(signalType.serverAnswer, (info: NegotiateInfo) => {
      infoHandler(info)
        .then((info) => {

        })
    })
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

  private onServerOffer(cb: (message: any) => void) {
    this.channel.onListen(signalType.serverOffer, cb);
  }
}

interface ActivateListenerHandler {
  handleOfferMessage: (info: NegotiateInfo) => Promise<NegotiateInfo>;
  handleAnswerMessage: (info: NegotiateInfo) => Promise<NegotiateInfo>;
}

export interface Channel {
  // peerConnection을 주입받아 Signaling Channel와 소통하는 책임을 맡음
  negotiate: (peerConnection: RTCPeerConnection, message?: any) => void;
  activateListener: (handler: ActivateListenerHandler) => void;
}