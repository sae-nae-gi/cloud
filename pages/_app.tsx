import { NextPage } from "next";
import { AppProps } from "next/app";
import { appStore  } from "../src/stores";
import { Provider} from "react-redux";
import { createContext } from "react";
import { Socket } from "../src/utils";

const socketContext = createContext(null);

const { Provider: SocketProvider} = socketContext;

const App:NextPage<AppProps> = ({Component, pageProps}) => {
  const socket = new Socket();
  return (
    <Provider store={appStore}>
      <SocketProvider value={socket}>
      <Component {...pageProps}/>
      </SocketProvider>
    </Provider>
  )}

export const getServerSideProps = async () => {
  
}

interface AppExtendProps extends AppProps {

}

export default App;