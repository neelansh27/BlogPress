import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
export default function Task() {
  const params = useParams();
  const [tasks, setTasks] = useState("");
  useEffect(() => {
    fetch(`http://localhost:3000/${params.id}/get/task`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setTasks("No Tasks");
        } else {
          data = data.map((e) => {
            return (
            <Link key={e._id} to={`task/${e._id}`}>
              <div>
                <h3>{e.title}</h3>
                <div>{e.status}</div>
              </div>
            </Link>
            );
          });
          setTasks(data);
        }
      },[params])
      .catch((err) => console.log(err));
  });
  return <div>{tasks}</div>;
}
