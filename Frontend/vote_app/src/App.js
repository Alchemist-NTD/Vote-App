import "./App.css";
import React, { useState } from "react";
import DataContext from "./context/provider";
import AppRouter from "./route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const [user, setUser] = useState();
  const [isFetchUser, setIsFetchUser] = useState(false);
  return (
    <div className="App">
      <DataContext.Provider
        value={{ user, setUser, isFetchUser, setIsFetchUser }}
      >
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <AppRouter />
        </GoogleOAuthProvider>

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
