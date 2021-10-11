import { useContext } from "react";
import { socketContext } from "../stores/SocketStore";
import CloudSocket from "../utils/socket";

const useSocket = () => {
  const socket = useContext<CloudSocket>(socketContext);

  if(!socket){
    throw Error("Socket Context is not occur");
  }
  return socket;
}

export default useSocket;