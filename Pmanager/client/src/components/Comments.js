import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Comments(props) {
  const params = useParams();
  const [comments, setComments] = useState(props.comments);
  const [msg, setMsg] = useState("");
  const {user} = useContext(AuthContext);
  function handleCommentMsg(e) {
    setMsg(e.target.value);
  }

  function addComment() {
    if (msg.length===0){
      return;
    }
    fetch(`http://localhost:3000/task/add/comment`,{
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tid: params.taskId,
        user: user.name,
        content:msg,
      }),
    })
      .then((res) => res.json())
      .then((task) => {
        setComments(task.comments);
        setMsg("")
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Comment"
        value={msg}
        onChange={handleCommentMsg}
        required
      />
      <button onClick={addComment}>Comment</button>
      {(comments.length !== 0 &&
        comments.map((e) => {
          return (
            <div key={e._id}>
              <div>user &gt; {e.user}</div>
              <div>{e.content}</div>
            </div>
          );
        })) || <div> No Comments </div>}
    </div>
  );
}
