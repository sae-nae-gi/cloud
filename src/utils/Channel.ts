import CloudSocket, { MessageAction } from "./socket";
import { NegotiateInfo } from "./types";

export const signalType = {
  serverOffer: "@server/offer",
  clientOffer: "@client/offer",
  serverAnswer: "@server/answer",
  clientAnswer: "@client/answer",
  iceCandidate: "@server/newIceCandidate",
}

// 시그널링 서버와의 시그널링을 담당한다.
export class SignalingChannel implements Channel {
  private channel: CloudSocket;

  constructor(socketIo: CloudSocket) {
    this.channel = socketIo;
  }

  // 상대 피어와 (시그널링 서버와) Media Capability를 교환함
  negotiate(info: NegotiateInfo, type: "offer" | "answer") {
    this.send({
      type: type === "offer"
        ? signalType.clientOffer
        : signalType.clientAnswer,
      payload: info,
    });
  }

  activateListener(handler: ActivateListenerHandler) {
    this.onReceiveServerOffer(handler.handleOfferMessage);
    this.onReceiveServerAnswer(handler.handleAnswerMessage);
  }

  private onReceiveServerOffer(infoHandler: ActivateListenerHandler["handleOfferMessage"]) {
    this.channel.onListen(signalType.serverOffer, (info: NegotiateInfo) => {
      console.log({ offer: info })
      infoHandler(info)
        .then((combinedOfferInfo) => {
          this.send({
            type: signalType.clientAnswer,
            payload: combinedOfferInfo,
          });
        })
    })
  }

  private onReceiveServerAnswer(infoHandler: (info: NegotiateInfo) => Promise<NegotiateInfo>) {
    this.channel.onListen(signalType.serverAnswer, (info: NegotiateInfo) => {
      console.log({ answer: info })
      infoHandler(info)
    })
  }


  private send(action: MessageAction) {
    this.channel.emit(action);
  }
}

interface ActivateListenerHandler {
  handleOfferMessage: (info: NegotiateInfo) => Promise<NegotiateInfo>;
  handleAnswerMessage: (info: NegotiateInfo) => Promise<NegotiateInfo>;
}

export interface Channel {
  // peerConnection을 주입받아 Signaling Channel와 소통하는 책임을 맡음
  negotiate: (info: NegotiateInfo, type: "offer" | "answer") => void;
  activateListener: (handler: ActivateListenerHandler) => void;
}