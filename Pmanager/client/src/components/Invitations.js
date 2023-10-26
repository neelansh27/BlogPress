import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
export default function Invitations() {
  const [invites, setInvites] = useState("");
  const { user } = useContext(AuthContext);

  function handleAccept(inviteId) {
    fetch("http://localhost:3000/project/invite/accept", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inviteId: inviteId,
      }),
    }).then(() => {
      let newArr = [];
      for (let e of invites) {
        if (e._id !== inviteId) {
          newArr.push(e);
        }
      }
      if (newArr.length === 0) {
        setInvites("No Invites");
      } else {
        setInvites(newArr);
      }
    });
  }
  function handleDecline(inviteId) {
    fetch("http://localhost:3000/project/invite/decline", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inviteId: inviteId,
      }),
    }).then(() => {
      let newArr = [];
      for (let e of invites) {
        if (e._id !== inviteId) {
          newArr.push(e);
        }
      }
      if (newArr.length === 0) {
        setInvites("No Invites");
      } else {
        setInvites(newArr);
      }
    });
  }
  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`http://localhost:3000/${user.id}/invite`)
      .then((res) => res.json())
      .then((messages) => {
        if (messages.length === 0) {
          return setInvites("No Invites");
        }
        messages = messages.map((e) => {
          return (
            <div key={e._id}>
              <h2>{e.projectName}</h2>
              <div> Invited by {e.sender}</div>
              <button
                key={e._id}
                onClick={() => {
                  handleAccept(e._id);
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  handleDecline(e._id);
                }}
              >
                Decline
              </button>
            </div>
          );
        });
        setInvites(messages);
      });
  }, [user]);
  return <div>{invites}</div>;
}
