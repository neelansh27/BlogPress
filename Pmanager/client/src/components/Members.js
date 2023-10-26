import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
export default function Members(props) {
  const params = useParams();
  const [reciever, setReciever] = useState("");
  const { user } = useContext(AuthContext);
  const [response,setResponse]=useState("")
  function handleInput(e) {
    setReciever(e.target.value);
  }
  function handleInvite() {
    fetch(`http://localhost:3000/project/invite`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: user.name,
        reciever: reciever,
        pid: params.id,
        pname: props.name,
      }),
    })
      .then((res) => res.json()).then(()=>{
        setResponse("Invitation Sent!")
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {Boolean(props.members) &&
        props.members.map((e) => {
          return <div key={e._id}>{e.name}</div>;
        })}
      <div>
        <input id={reciever} type="text" onChange={handleInput} placeholder="Enter user id" />
        <button onClick={handleInvite}>Invite</button>
        {response}
      </div>
    </div>
  );
}
