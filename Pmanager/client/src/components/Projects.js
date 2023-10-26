import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const API_URL = "http://localhost:3000";
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`${API_URL}/project/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <div>
      {!projects ||
        projects.map((project) => {
          return (
            <Link key={project._id} to={`/project/${project._id}`}>
              <div >
                <h1>{project.name}</h1>
                <div>Created on: {(new Date(project.started)).toLocaleDateString()}</div>
                <div>{project.status}</div>
                <hr />
              </div>
            </Link>
          );
        })}
    </div>
  );
}
