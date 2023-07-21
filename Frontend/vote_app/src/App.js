import "./App.css";
import React, { useState } from "react";
import DataContext from "./context/provider";
import AppRouter from "./route";
function App() {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://robohash.org/3d69426afc09ac4d6259056e8f57571e?set=set4&bgset=&size=200x200"
  });

  return (
    <div className="App">
      <DataContext.Provider value={{ user, setUser }}>
        <AppRouter />
      </DataContext.Provider>
    </div>
  );
}

export default App;
