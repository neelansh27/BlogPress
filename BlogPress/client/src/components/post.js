import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState(null);
  const [query, setQuery] = useState("");
  const [page,setPage] = useState(1)
  const [total,setTotal] = useState(1)

  function handleInput(event) {
    setQuery(event.target.value);
  }

  function search() {
    fetch(
      `http://localhost:3000/post/getposts?page=${page}&search=${query}`
    )
      .then((res) => res.json())
      .then((posts) => {
        setPost(posts);
      });
  }
  useEffect(() => {
    fetch(`http://localhost:3000/post/getposts?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data.posts);
        setTotal(Math.ceil(data.count/6))
      });
  }, [page]);
  function handlePageNext(){
    setPage(page+1)
  }
  function handlePagePrev(){
    setPage(page-1)
  }
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
        })
      }
    {page!==1 && <button onClick={handlePagePrev}>Prev</button>}
    {page!==total && <button onClick={handlePageNext}>Next Page</button> }
    </main>
  );
}
