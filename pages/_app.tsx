import { NextPage } from "next";
import { AppProps } from "next/app";
import { appStore  } from "../src/stores";
import { Provider} from "react-redux";
import { createContext } from "react";
import { Socket } from "../src/utils";
import { ThemeProvider, Global, css } from "@emotion/react";
import emotionReset from "emotion-reset"
import theme from "../src/theme";
import Layout from "../src/components/layout";

const socketContext = createContext(null);

const { Provider: SocketProvider} = socketContext;

const App:NextPage<AppProps> = ({Component, pageProps}) => {
  const socket = new Socket();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={css`
        ${emotionReset}
      
        html,
        body {
          height: 100%;
        }

        #__next,
        main {
          height: 100%;
        }

        button {
          border: 0;
        }
      `}/>
      <Provider store={appStore}>
        <SocketProvider value={socket}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
        </SocketProvider>
      </Provider>
    </ThemeProvider>
  )}

export const getServerSideProps = async () => {
  
}

interface AppExtendProps extends AppProps {

}

export default App;