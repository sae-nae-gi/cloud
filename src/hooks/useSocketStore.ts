import { useContext } from "react";
import { socketContext } from "../stores/SocketStore";

const useSocket = () => {
  const socket = useContext(socketContext);

  if(!socket){
    throw Error("Socket Context is not occur");
  }
  return socket;
}

export default useSocket;