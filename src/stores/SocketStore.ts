import { createContext } from "react";

export const socketContext = createContext(null);
export const { Provider: SocketProvider} = socketContext;
