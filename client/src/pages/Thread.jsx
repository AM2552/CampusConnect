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
  const [updatedPost, setUpdatedPost] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);

  const [searchUser, setSearchUser] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/byId/${id}`).then((response) => {
      setThreadObject(response.data);
    });

    axios.get(`${serverUrl}/posts/${id}`).then((response) => {
      setAllPosts(response.data); 
      setPostObjects(response.data);
    });
  }, [id]);
  useEffect(() => {
    let filtered = allPosts;
    if (searchUser.trim() !== '') {
      filtered = filtered.filter(post => 
        post.username.toLowerCase().includes(searchUser.toLowerCase())
      );
    }
    if (searchKeyword.trim() !== '') {
      filtered = filtered.filter(post => 
        post.postText.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setPostObjects(filtered);
  }, [searchUser, searchKeyword, allPosts]);

  const handleUserSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };
 
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


  const renderButton = (condition, onClick, text, className) => condition && <button className={className} onClick={onClick}>{text}</button>;


  return (
    <div className="threadPageBody">
      <div className="threadPageLeft">
        <div className="threadObject">
          {['title', 'threadText', 'username'].map(prop => 
          <div className={`threadObject${prop}`}>{threadObject[prop]}</div>)} 
          {threadObject.closed && <div className="threadStatus">This thread is closed.</div>}
          {threadObject.archived && <div className="threadStatus">This thread is archived.</div>}
          <div className="modButtons">
          {renderButton(auth.modState, deleteThread, 'Delete Thread', "deleteThreadBtn")}
          {renderButton(auth.modState && !threadObject.closed, closeThread, 'Close Thread', "closeThreadBtn")}
          {renderButton(auth.modState && !threadObject.archived, archiveThread, 'Archive Thread', "archiveThreadBtn")}
          </div>
        </div>
      </div>
      <div className="threadPageRight">
        <div className="searchPostsMainDiv">
        <input 
          type="text" 
          placeholder="Search by user..." 
          value={searchUser} 
          onChange={handleUserSearchChange}
          className="userSearch"
        />
        
        <div className="searchPostByKey">
        <input 
          type="text" 
          placeholder="Search by keyword..." 
          value={searchKeyword} 
          onChange={handleKeywordChange}
          className="keySearch"
        />
        </div>
        </div>
        {!threadObject.closed && !threadObject.archived && (
          <div className="addPostField">
            <input type="text" placeholder="Post your comment..." value={newPost} onChange={e => setNewPost(e.target.value)} className="commentInput" />
            <button className="addPostButton" onClick={addPost}>Add Post</button>
          </div>
        )}
        <div className="listOfPosts"></div>
        {postObjects.map((post, key) => (
          <div key={key} className="post">
            <div className="postText">{post.postText}</div>
            <div className="postAuthor">{post.username}</div>
            {renderButton((auth.modState || post.username === auth.user) && !threadObject.closed, () => removePost(post), 'Delete' ,"deletePostBtn")}
            {post.username === auth.user && (
              <>
                {editingPostId === post.id ? (
                  <form onSubmit={e => {
                    e.preventDefault();
                    editPost(post, updatedPost);
                    setEditingPostId(null);
                  }}>
                    <div className="updateHereDiv">
                      
                    <input className="updatePostHere" type="text" placeholder="Updated post text..." value={updatedPost} onChange={e => setUpdatedPost(e.target.value)} />
                    </div>
                    <button className="submitEdit" type="submit">Submit</button>
                  </form>
                ) : renderButton(!threadObject.closed, () => startEditing(post), 'Edit', "editPostBtn")}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
  
