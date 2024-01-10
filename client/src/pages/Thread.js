import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../helpers/AuthProvider";

function Thread() {
  let auth = useAuth();
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
    const token = localStorage.getItem("accessToken");
    if (newPost) {
      axios
        .post(
          "http://localhost:5001/posts",
          { postText: newPost, ThreadId: id },
          {
            headers: {
              'auth-token': `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          setNewPost("");
          // Refetch the posts after adding a new one
          axios.get(`http://localhost:5001/posts/${id}`).then((response) => {
            setPostObjects(response.data);
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            alert("Please login or register to use this function");
          }
        });
    } else {
      alert("Field is empty")
    }
  };
  
  

    const removePost = (post) => {
      const token = localStorage.getItem("accessToken");
      console.log(post)
      let postId = post.id
      if (postId) {
        axios
          .delete(
            `http://localhost:5001/posts/${id}/${postId}`,
            {
              headers: {
                'auth-token': `Bearer ${token}`,
                'authority': auth.mod
              }
            }
          )
          .then((response) => {
            setPostObjects(postObjects.filter(post => post.id !== postId));
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              alert("Please login or register to use this function");
            }
          });
      } else {
        alert("Post ID is not provided");
      }
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
          <div className="postText">{post.postText}</div>
            <div className="postAuthor">{post.username}</div>
              {(auth.mod || post.username === auth.user) && (
              <button onClick={() => removePost(post)}>Delete</button>
            )}
          </div>
          );
          })}
      </div>
    </div>
  );
}

export default Thread;
