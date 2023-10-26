import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  const { storeItems } = useContext(AuthContext);
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        storeItems(data.token);
        setresponse(data.message);
        if (!data.message) {
          window.location.href = "/";
        }
      });
  };
  return (
    <div className="outerBox">
      <div className="innerBox">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {!response || <div className="notify">{response}</div>}
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
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
          <div className="link-text">
            <Link to="/auth/register" className="auth-other">
              New Here? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
