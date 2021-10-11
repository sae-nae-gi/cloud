import {io, Socket} from "socket.io-client";

type MessageType = "@sendMessage"
  | "@joinRoom" 
  | "@joinedRoom"
  | "@leaveRoom";

interface MessageAction {
  type: MessageType | string;
  payload: string;
}

class CloudSocket {
  socket?: Socket;
  private url: string;
  private forceDisconnect?: boolean;

  constructor(url:string = "http://localhost:3001"){
    this.socket = io(url,{
      path: '/socket.connect',
      transports: ['websocket'],
      autoConnect: false,      
    });
    this.connect();
  }

  setForceDisconnect(boolean: boolean) {
    this.forceDisconnect = boolean;
  }

  get getSocket() {
    return this.socket;
  }

  reconnect(){
    if(this.socket && this.socket.disconnected && !this.forceDisconnect){
      this.socket.connect();
    }
  }

  onListen(type: MessageAction["type"], cb: (message: any) => void) {
    if(this.socket){
      this.socket.on(type, cb)
    }
  }

  connect() {
    this.socket.on("connect", () => {
      console.warn("socket Connected");
    })
    if(this.socket){
      this.socket.connect();
    }
    this.socket.on("disconnect", () => {
      this.reconnect();
    })
  }

  emit(action: MessageAction) {
    if(this.socket){
      const {type, payload} = action;
      if(type) {
        this.socket.emit(type,payload);
      }
    }
  }

}

export default CloudSocket;