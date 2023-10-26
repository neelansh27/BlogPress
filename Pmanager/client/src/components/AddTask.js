import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate,useParams } from "react-router-dom";
const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  function handleName(e) {
    return setName(e.target.value);
  }

  function handleDesc(e) {
    return setDesc(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/project/add/task`, {
      method: "post",
      headers: {
        Accept: "applcation/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: params.id,
        author: user.id,
        title: name,
        description: desc,
      }),
    })
      .then(() => {
        navigate("/project/"+params.id);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleName}
            type="text"
            value={name}
            placeholder="Title of Task"
            required
          />
        </div>
        <div>
          <textarea
            onChange={handleDesc}
            value={desc}
            placeholder="Task Description"
          ></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
