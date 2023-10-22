import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Post() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [post, setPost] = useState(null);
  const [query, setQuery] = useState("");

  function handleInput(event) {
    setQuery(event.target.value);
  }

  function search() {
    const page = params.get("page") || 1;
    const searchText = query;
    fetch(
      `http://localhost:3000/post/getposts?page=${page}&search=${searchText}`
    )
      .then((res) => res.json())
      .then((posts) => {
        setPost(posts);
      });
  }
  useEffect(() => {
    fetch(`http://localhost:3000/post/getposts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data);
      });
  }, []);

  return (
    <main>
      <input
        type="text"
        value={query}
        name="search"
        onChange={handleInput}
        autoComplete="off"
      />
      <button onClick={search}>O</button>
      {!post ||
        post.map((item) => {
          return (
            <div key={item._id}>
              <div>{item.title}</div>
              <div>{item.author}</div>
              <div>Posted on {(new Date(item.createdAt)).toLocaleDateString()}</div>
            <div>
              <Link to={`/post/${item._id}`}>View post</Link>
            </div>
              <hr />
            </div>
          );
        })}
    </main>
  );
}
