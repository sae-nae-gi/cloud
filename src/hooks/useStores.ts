import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../stores";

const useStores = () => {
  const state = useSelector((state: RootState) => state);
  return state;
}

export default useStores;