import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Members from "./Members"
import Task from "./Task";
function ProjectView() {
  const params = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/project/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
      })
      .catch((err) => console.log(err));
  }, [params]);
  return (
    <div>
      {!project || (
        <>
          <div key={project._id}>
            <h1>{project.name}</h1>
            <div>Owner:{project.ownerName}</div>
            <div>Created on:{project.started}</div>
            <div>{project.status}</div>
            <div>{project.description}</div>
            <hr />
          </div>
        <h1>Members</h1>
        <Members name={project.name} members={project.members}/>
        <h1>Tasks</h1>
        <Task/>
        </>
      )}
    </div>
  );
}

export default ProjectView;
