import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Thread() {
  let { id } = useParams();
  const [threadObject, setThreadObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5001/byId/${id}`).then((response) => {
      setThreadObject(response.data);
    });
  });
  return (
    <div className="threadPage">
      <div classname="threadObject">
        <div className="threadObjectTitle">{threadObject.title}</div>
        <div className="threadObjectText">{threadObject.threadText}</div>
        <div className="threadObjectUsername">{threadObject.username}</div>
      </div>
    </div>
  );
}

export default Thread;
