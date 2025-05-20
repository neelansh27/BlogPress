import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../css/postView.css"
export default function PostView() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const addComment = () => {
    fetch("https://blogpress-i1to.onrender.com/comment/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: post._id,
        author: user.name,
        content: comment,
      }),
    })
      .then((res) => res.json())
      .then((newPost) => {
        setPost(newPost);
        setComment("");
      });
  };
  const handleInput = (e) => {
    setComment(e.target.value);
  };
  useEffect(() => {
    fetch("https://blogpress-i1to.onrender.com/post/get/" + params.id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data);
      });
  }, []);
  return (
    <main>
      {!post || (
        <>
        <div key={post._id} className="post-box">
          <h1>{post.title}</h1>
          <div className="post-author">By {post.author}</div>
          <div className="post-creation">Posted on {(new Date(post.createdAt)).toLocaleDateString()}</div>
          <div className="post-content">{post.content}</div>
        </div>
          <div className="comment-box">
            <textarea
              value={comment}
              onChange={handleInput}
              placeholder="Add Comment"
            ></textarea>
            <div className="comment-btn">
              <button onClick={addComment}>Comment</button>
            </div>
          </div>
        </>
      )}
    <div className="comment-container">
      {!post || (post.comments.length===0 && <div className="no-comments"><strong>No Comments</strong></div> )}
      {!post ||
        post.comments.slice().reverse().map((comment) => {
          return (
            <div key={comment._id} className="comment">
              <div className="comment-author">user &gt; {comment.author}</div>
              <div>{comment.content}</div>
            </div>
          );
        })}
    </div>
    </main>
  );
}
