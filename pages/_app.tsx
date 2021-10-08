import { NextPage } from "next";
import { appStore  } from "../src/stores";
import { Provider} from "react-redux";

interface AppProps {

}

const App:NextPage<AppProps> = () => (
    <Provider store={appStore}>
      <div />
    </Provider>
  )

export const getServerSideProps = async () => {
  
}

export default App;