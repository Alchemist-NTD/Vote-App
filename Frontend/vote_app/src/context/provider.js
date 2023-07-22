import React from "react";

const data = {
  user: null,
  setUser: () => {},
  isFetchUser: false,
  setIsFetchUser : () => {}
};
const DataContext = React.createContext(data);

export default DataContext;
