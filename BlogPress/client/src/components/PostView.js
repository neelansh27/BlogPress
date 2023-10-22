import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
export default function PostView() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const addComment = () => {
    fetch("http://localhost:3000/comment/add", {
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
    fetch("http://localhost:3000/post/get/" + params.id)
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
        <div key={post._id}>
          <h2>{post.title}</h2>
          <small>By {post.author}</small>
          <p>{post.content}</p>
          <small>{post.createdAt}</small>
          <hr />
          <div className="commentbox">
            <textarea
              value={comment}
              onChange={handleInput}
              placeholder="Add Comment"
            ></textarea>
            <div>
              <button onClick={addComment}>Comment</button>
            </div>
          </div>
        </div>
      )}

      {!post ||
        post.comments.slice().reverse().map((comment) => {
          return (
            <div key={comment._id}>
              <div>{comment.author}</div>
              <p>{comment.content}</p>
              <hr />
            </div>
          );
        })}
    </main>
  );
}
