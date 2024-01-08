import React, { useState, useContext } from "react";
import { useAuth } from "../helpers/AuthProvider";

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
    <div className="loginContainer">
      <label>Username or Email Address:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;


