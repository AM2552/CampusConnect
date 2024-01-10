import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [authState, setAuthState] = useState(false)
  const [modState, setModState] = useState(false)
  const navigate = useNavigate();
  const loginAction = async (data) => {
    axios
      .post("http://localhost:5001/users/login", data)
      .then((res) => {
      localStorage.setItem("accessToken", res.data.token.split(' ')[1]);
      setUser(res.data.username);
      setToken(res.data.token);
      setAuthState(true);
      if(res.data.mod){
        setModState(true);
      }
      alert("Logged in as " + res.data.username);
      navigate("/");
    })
    .catch(() => {
      alert("Wrong Username or Password");
    })
    

  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setAuthState(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, authState, modState, setModState, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
