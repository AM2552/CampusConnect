import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [listOfThreads, setListOfThreads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/").then((response) => {
      setListOfThreads(response.data);
    });
  }, []);
  return ( 
    <div className="App">
      {listOfThreads.map((value, key) => { 
      return (
      <div className="thread">
        <div className="title">{value.title} </div>
        <div className="body">{value.threadText} </div>
        <div className="footer">{value.username} </div>
      </div> 
      );
    })}
  </div>
  );
}

export default App;
