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
    <div className="threadPageBody">
      <div className="threadPageLeft">
        <div classname="threadObject">
          <div className="threadObjectUsername">{threadObject.username}</div>
          <div className="threadObjectTitle">{threadObject.title}</div>
          <div className="threadObjectText">{threadObject.threadText}</div>
          
        </div>
      </div>
      <div className="threadPageRight">
        <div className="addPostField">
          <input
            type="text"
            placeholder="Post your comment..."
            value={newPost}
            onChange={(event) => {
              setNewPost(event.target.value);
            }}
            className="commentInput"
          />
          <button onClick={addPost} className="addPostButton">Add Post</button>
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
