import React from "react";

const data = {
  isLoading : false,
  setIsLoading: false,
  isFetchUser: false,
  setIsFetchUser : () => {}
};
const DataContext = React.createContext(data);

export default DataContext;
