import { NextPage } from "next";
import { AppProps } from "next/app";
import { appStore  } from "../src/stores";
import { Provider} from "react-redux";
import { Socket } from "../src/utils";
import { SocketProvider } from "../src/stores/SocketStore";
import { ThemeProvider, Global, css } from "@emotion/react";
import emotionReset from "emotion-reset"
import theme from "../src/theme";
import Layout from "../src/components/layout";

export const socket = new Socket();

const App:NextPage<AppProps> = ({Component, pageProps}) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={css`
        ${emotionReset}
      
        html,
        body {
          background-color: #202124;
          color: white;
          height: 100%;
        }

        * {
          box-sizing: border-box;
        }

        #__next {
          height: calc(100% - 92px);
        }

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