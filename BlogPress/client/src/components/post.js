import React, { useEffect, useState } from "react";


export default function Post() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/post/getposts")
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
          <hr />
          </div>
        )
      })}
    </main>
  );
}
