import React,{ useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import "../css/createPost.css"

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const navigate=useNavigate() 
  const handleTitle = (e) => {
    return setTitle(e.target.value);
  };
  const handleContent = (e) => {
    return setContent(e.target.value);
  };
  const handleSubmit = () => {
    
    fetch("http://localhost:3000/post/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.id,
        title: title,
        content: content,
      }),
    }).then(() => {
      navigate('/')
    });
  };
  return (
    <main>
      <h1 className="cp-title">Create Post</h1>
    <div className="cp-container">
    <div className="cp-box">
      <div className="cp-input">
        <input type="text" className="cp-heading" onChange={handleTitle} value={title} placeholder="Add title..." />
      </div>
      <div>
        <textarea value={content} placeholder="Add content..." className="cp-content" onChange={handleContent}></textarea>
      </div>
      <button onClick={handleSubmit} className="cp-btn"> Post </button>
</div>
</div>
    </main>
  );
}

export default CreatePost;
