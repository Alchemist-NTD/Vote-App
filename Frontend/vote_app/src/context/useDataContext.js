import { useContext } from "react";
import DataContext from "./provider";
function useDataContext() {
  const value = useContext(DataContext);
  return value;
}

export default useDataContext;
