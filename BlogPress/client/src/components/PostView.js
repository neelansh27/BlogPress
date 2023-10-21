import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function PostView() {
  const params = useParams();
  const [post, setPost] = useState(null);
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
    {
      !post || <div key={post._id}>
        <h2>{post.title}</h2>
        <small>By {post.author}</small>
        <p>{post.content}</p>
        <small>{post.createdAt}</small>
      <hr />
      </div>
    }
      {!post || post.comments.map((comment) => {
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
