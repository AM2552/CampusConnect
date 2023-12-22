import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [listOfThreads, setListOfThreads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/").then((response) => {
      setListOfThreads(response.data);
    });
  }, []);

  return (
    <div>
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

export default Home;
