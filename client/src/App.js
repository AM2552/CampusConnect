import './App.css';
import axios from "axios";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    axios.get("http://localhost:5001/").then((response) => {
      console.log(response);
    });
  }, []);
  return <div className="App">Welcome to CampusConnect</div>;
}

export default App;
