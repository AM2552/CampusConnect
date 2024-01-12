import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../helpers/AuthProvider";
import { useNavigate } from "react-router-dom";

function Thread() {

  const navigate = useNavigate();
  const serverUrl = 'http://localhost:5001';

  let auth = useAuth();
  let { id } = useParams();
  const [threadObject, setThreadObject] = useState({});
  const [postObjects, setPostObjects] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [updatedPost, setUpdatedPost] = useState(""); // Add this line

  const [editingPostId, setEditingPostId] = useState(null); // Add this line

  useEffect(() => {
    axios.get(`${serverUrl}/byId/${id}`).then((response) => {
      setThreadObject(response.data);
    });

    axios.get(`${serverUrl}/posts/${id}`).then((response) => {
      setPostObjects(response.data);
    });
  }, [id]);

  const addPost = () => {
    const token = localStorage.getItem("accessToken");
    if (newPost) {
      axios
        .post(
          `${serverUrl}/posts`,
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
          axios.get(`${serverUrl}/posts/${id}`).then((response) => {
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
          `${serverUrl}/posts/${id}/${postId}`,
          {
            headers: {
              'auth-token': `Bearer ${token}`,
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

  const editPost = (post, updatedText) => {
    const token = localStorage.getItem("accessToken");
    let postId = post.id
    if (postId && updatedText) {
      axios
        .put(
          `${serverUrl}/posts/${id}/${postId}`,
          { postText: updatedText },
          {
            headers: {
              'auth-token': `Bearer ${token}`,
            }
          }
        )
        .then((response) => {
          // Update the post in the state
          setPostObjects(postObjects.map(post => post.id === postId ? { ...post, postText: updatedText } : post));
          setEditingPostId(null); // Add this line
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            alert("Please login or register to use this function");
          }
        });
    } else {
      alert("Post ID or updated text is not provided");
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setUpdatedPost(post.postText);
  };


  const deleteThread = async () => {
    const token = localStorage.getItem("accessToken");
    let id = threadObject.id;
    try {
      const response = await axios.delete(`${serverUrl}/threads/${id}`, {
        headers: {
          'auth-token': `Bearer ${token}`,
        }
      });
      alert("Thread succesfully deleted");
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const archiveThread = async () => {
    const token = localStorage.getItem("accessToken");
    let id = threadObject.id;
    try {
      const response = await axios.put(`${serverUrl}/threads/${id}/archive`, {}, {
        headers: {
          'auth-token': `Bearer ${token}`,
        }
      });
      alert("Thread Archived");
      setThreadObject(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const closeThread = async () => {
    const token = localStorage.getItem("accessToken");
    let id = threadObject.id;
    try {
      const response = await axios.put(`${serverUrl}/threads/${id}/close`, {}, {
        headers: {
          'auth-token': `Bearer ${token}`,
        }
      });
      alert("Thread Closed");
      setThreadObject(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="threadPage">
      <div className="left">
        <div className="threadObject">
          <div className="threadObjectTitle">{threadObject.title}</div>
          <div className="threadObjectText">{threadObject.threadText}</div>
          <div className="threadObjectUsername">{threadObject.username}</div>
          {(auth.modState) && (
            <>
              <button onClick={deleteThread}>Delete Thread</button>
            </>
          )}
          {(auth.modState && !threadObject.closed) && (
            <>
              <button onClick={closeThread}>Close Thread</button>
            </>
          )}
          {(auth.modState && !threadObject.archived) && (
            <>
              <button onClick={archiveThread}>Archive Thread</button>
            </>
          )}
        </div>
      </div>
      <div className="right">
        {!threadObject.closed && !threadObject.archived && (
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
        )}
        <div className="listOfPosts"></div>
        {postObjects.map((post, key) => {
          return (
            <div key={key} className="post">
              <div className="postText">{post.postText}</div>
              <div className="postAuthor">{post.username}</div>
              {(auth.modState || post.username === auth.user) && (
                <button onClick={() => removePost(post)}>Delete</button>
              )}
              {post.username === auth.user && (
                <>
                  {editingPostId === post.id ? (
                    <form onSubmit={(event) => {
                      event.preventDefault();
                      editPost(post, updatedPost);
                      setEditingPostId(null); // Add this line
                    }}>
                      <input
                        type="text"
                        placeholder="Updated post text..."
                        value={updatedPost}
                        onChange={(event) => {
                          setUpdatedPost(event.target.value);
                        }}
                      />
                      <button type="submit">Submit</button>
                    </form>
                  ) : (
                    <button onClick={() => startEditing(post)}>Edit</button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}  

export default Thread;

