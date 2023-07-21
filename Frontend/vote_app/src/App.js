import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import DataContext from './provider';
function App() {
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
  });

  return (
    <div className="App">
      <DataContext.Provider value={{ user, setUser }}>
      <div>
        <h1>React App with User Context</h1>
      </div>
    </DataContext.Provider>
    </div>
  );
}

export default App;
