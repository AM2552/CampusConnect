import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfThreads, setListOfThreads] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/").then((response) => {
      setListOfThreads(response.data);
    });
  }, []);

  return (
    <div>
      {listOfThreads.map((value, key) => {
        return (
          <div
            className="thread"
            onClick={() => {
              navigate(`/thread/${value.id}`);
            }}
          >
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
