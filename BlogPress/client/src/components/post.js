import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/post/getposts?page=1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data);
      });
  }, []);
  return (
    <main>
      {!post || post.map((item) => {
        return (
          <div key={item._id}>
          <div>{item.title}</div>
          <div>{item.author}</div>
          <div>{item.createdAt}</div>
          <Link to={`/post/${item._id}`}> View Post</Link>
          <hr />
          </div>
        )
      })}
    </main>
  );
}
