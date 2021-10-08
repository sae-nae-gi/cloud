import { NextPage } from "next";
import { AppProps } from "next/app";
import { appStore  } from "../src/stores";
import { Provider} from "react-redux";

interface AppExtendProps extends AppProps {

}

const App:NextPage<AppProps> = ({Component, pageProps}) => (
    <Provider store={appStore}>
      <Component {...pageProps}/>
    </Provider>
  )

export const getServerSideProps = async () => {
  
}

export default App;