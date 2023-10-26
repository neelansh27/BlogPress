import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const TaskView = () => {
  const params = useParams();
  const [task, setTask] = useState(null);
  const [members, setMembers] = useState("");
  const [assignees, setAssignees] = useState(null);
  const [aname, setAname] = useState("");
  function handleNameInput(e) {
    return setAname(e.target.value);
  }

  function addAssignee() {
    for (let i of members) {
      if (i.name === aname) {
        fetch(`http://localhost:3000/task/add/assignee`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tid: params.taskId,
            id: i.id,
            name: i.name,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setAname("")
            setTask(data);
            setAssignees(data.assignees);
          });
        break;
      }
    }
  }

  function unAssign(assigneeId) {
    fetch(`http://localhost:3000/task/unassign`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tid: params.taskId,
        uid: assigneeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setAssignees(data.assignees);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch(`http://localhost:3000/task/${params.taskId}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setAssignees(data.assignees);
      })
      .catch((err) => console.log(err));
  }, [params]);

  useEffect(() => {
    fetch(`http://localhost:3000/project/${params.id}/members`)
      .then((res) => res.json())
      .then((mem) => {
        if (mem.length === 0) {
          setMembers("No Members");
        } else {
          setMembers(mem);
        }
      });
  }, [params]);
  return (
    <div>
      {!task || (
        <>
          <div>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
            <div>{task.author}</div>
          </div>
          <div>
            <h2>Assignees</h2>
            {(assignees.length !== 0 &&
              assignees.map((e) => {
                return (
                  <div key={e.id}>
                    {e.name}
                    <button
                      key={e.id}
                      onClick={() => {
                        unAssign(e.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })) || <div>No Assignees</div>}
            <div>
              <input
                type="text"
                value={aname}
                placeholder="Enter name"
                onChange={handleNameInput}
              />
            </div>
            <button onClick={addAssignee}>Add New Assignee</button>
          </div>
        <Comments comments={task.comments}/>
        </>
      )}
    </div>
  );
};

export default TaskView;
