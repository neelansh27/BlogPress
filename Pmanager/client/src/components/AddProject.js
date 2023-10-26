import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
const AddProject = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  function handleName(e) {
    return setName(e.target.value);
  }

  function handleDesc(e) {
    return setDesc(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/project/add`, {
      method: "post",
      headers: {
        Accept: "applcation/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.id,
        name: name,
        description: desc,
      }),
    })
      .then(() => {
        navigate("/");
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
            placeholder="Name of Project"
            required
          />
        </div>
        <div>
          <textarea
            onChange={handleDesc}
            value={desc}
            placeholder="Project Description"
          ></textarea>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;
