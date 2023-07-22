import "./App.css";
import React, { useState } from "react";
import DataContext from "./context/provider";
import AppRouter from "./route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [user, setUser] = useState();
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: "",
    handleClose: () => {},
    handleSubmit: () => {},
  });
  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    title: "",
    content: "",
    handleClose: () => {},
  });

  return (
    <div className="App">
      <DataContext.Provider
        value={{ user, setUser, modal, setModal, setRejectModal, rejectModal }}
      >
        <AppRouter />
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </DataContext.Provider>
    </div>
  );
}

export default App;
