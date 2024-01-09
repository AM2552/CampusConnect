import React, { useState, useContext } from "react";
import { useAuth } from "../helpers/AuthProvider";
import { Routes, Router, Link, useNavigation } from "react-router-dom";
import Registration from "./Registration";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { setAuthState } = useContext(AuthContext);
  const auth = useAuth();
  const login = () => {
    const data = { usernameOrEmail: username, password: password };
    auth.loginAction(data);

  };
  return (
    <div>
      <div className="loginContainer1">
        <label className="userLabel">Username or Email Address:</label>
        <input
          className="lgCon1"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        </div>
        <div className="loginContainer2">
        <label className="userLabel">Password:</label>
        <input
          className="lgCon2"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div className="registerButtonContainer">
      <button onClick={login} className="loginBtn">Login</button>
      </div>
      <div className="lgnBtncontainer">
      <Link to="/register">
          <button className="registerBtn">Register instead</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;


