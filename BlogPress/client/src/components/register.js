import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/auth.css"
function Register() {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  const handleName = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://blogpress-u5fv.onrender.com/register", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setresponse(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="outerBox">
      <div className="innerBox">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          {!response || response}
          <div className="row">
            <label htmlFor="username">Name</label>
            <input
              type="username"
              name="username"
              value={username}
              onChange={handleName}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="auth-btn">
            <button type="submit">Submit</button>
          </div>
    <div className="link-text">
          <Link onSubmit={handleSubmit} to="/auth/login" className="auth-other">Already a User? Login</Link>
</div>
        </form>
      </div>
    </div>
  );
}

export default Register;
