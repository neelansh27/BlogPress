import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/post.css"

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
      `https://blogpress-u5fv.onrender.com/post/getposts?page=${page}&search=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPost(data.posts);
      });
  }
  useEffect(() => {
    fetch(`https://blogpress-u5fv.onrender.com/post/getposts?page=${page}`)
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
    <div class="searchBar">
      <input
        type="text"
        value={query}
        name="search"
        placeholder="Search Posts..."
        onChange={handleInput}
        autoComplete="off"
      />
      <button onClick={search}>
        <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g className="search-path" fill="none" stroke="#343434"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4"/><circle cx="8" cy="8" r="7"/></g></svg>
    </button>
</div>
    <div className="post-container">
      {!post ||
        post.map((item) => {
          return (
            <div className="post" key={item._id}>
              <div className="post-title">{item.title}</div>
              <small className="post-author">By {item.author}</small>
              <small className="post-creation">Posted on {(new Date(item.createdAt)).toLocaleDateString()}</small>
            <div>
              <Link className="post-view" to={`/post/${item._id}`}>View post</Link>
            </div>
            </div>
          );
        })
      }
  </div>
    <div className="nav-buttons">
    {page!==1 && <button onClick={handlePagePrev}>Prev</button>}
    {page!==total && <button onClick={handlePageNext}>Next</button> }
  </div>
    </main>
  );
}
