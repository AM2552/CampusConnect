import React, { useState, useContext } from "react";
import { useAuth } from "../helpers/AuthProvider";
import "../Login.css";
import { Routes, Router, Link, useNavigation } from "react-router-dom";
import Registration from "./Registration";






function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { setAuthState } = useContext(AuthContext);
  const auth = useAuth();


  const extractUsername = () => {
    return username;
  };



  const login = () => {
    const data = { usernameOrEmail: username, password: password };
    auth.loginAction(data);

  };

  

  
  return (
    <div className="mainLoginDiv" >
      <label className="loginLabelDiv">Login</label>
      <div className="loginContainer1">
        <input
          className="lgCon1"
          type="text"
           placeholder="Username or Email"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        </div>
        <div className="loginContainer2">
        <input
          className="lgCon2"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div className="lgnBtncontainer">
      <button onClick={login} className="loginBtn">Login</button>
      </div>
      <div className="registerButtonContainer">
      <Link to="/register">
          <button className="registerBtn">Register instead</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;


