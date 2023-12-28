import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Thread() {
  let { id } = useParams();
  const [threadObject, setThreadObject] = useState({});
  const [postObjects, setPostObjects] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5001/byId/${id}`).then((response) => {
      setThreadObject(response.data);
    });

    axios.get(`http://localhost:5001/posts/${id}`).then((response) => {
      setPostObjects(response.data);
    });
  }, [id]);

  const addPost = () => {
    axios
      .post("http://localhost:5001/posts", { postText: newPost, ThreadId: id })
      .then((response) => {
        const postToAdd = { postText: newPost };
        setPostObjects([...postObjects, postToAdd]);
        setNewPost("");
      });
  };

  return (
    <div className="threadPage">
      <div className="left">
        <div classname="threadObject">
          <div className="threadObjectTitle">{threadObject.title}</div>
          <div className="threadObjectText">{threadObject.threadText}</div>
          <div className="threadObjectUsername">{threadObject.username}</div>
        </div>
      </div>
      <div className="right">
        <div className="addPostField">
          <input
            type="text"
            placeholder="Post your comment..."
            value={newPost}
            onChange={(event) => {
              setNewPost(event.target.value);
            }}
          />
          <button onClick={addPost}>Add Post</button>
        </div>
        <div className="listOfPosts"></div>
        {postObjects.map((post, key) => {
          return (
            <div key={key} className="post">
              {" "}
              {post.postText}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Thread;
