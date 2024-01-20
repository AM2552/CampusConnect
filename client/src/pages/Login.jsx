import React, { useState } from "react";
import { useAuth } from "../helpers/AuthProvider";
import { Link } from "react-router-dom";

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


