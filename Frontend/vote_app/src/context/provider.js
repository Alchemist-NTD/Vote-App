import React from "react";

const data = {
  user: null,
  setUser: () => {},
  modal: {
    isOpen: false,
    title: "",
    content: "",
    handleClose: () => {},
    handleSubmit: () => {},
  },
  setModal: () => {},
  rejectModal: {
    isOpen: false,
    title: "",
    content: "",
    handleClose: () => {},
  },
  setRejectModal: () => {},
};
const DataContext = React.createContext(data);

export default DataContext;
