import React,{ useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/auth.context";

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
      <h1>Create Post</h1>
      <div>
        <input type="text" onChange={handleTitle} value={title} />
      </div>
      <div>
        <textarea value={content} onChange={handleContent}></textarea>
      </div>
      <button onClick={handleSubmit}> Post </button>
    </main>
  );
}

export default CreatePost;
