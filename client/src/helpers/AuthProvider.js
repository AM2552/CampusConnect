import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Get user and modState from localStorage
  const savedUser = localStorage.getItem("user");
  const savedModState = localStorage.getItem("modState") === 'true';

  const [user, setUser] = useState(savedUser);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [authState, setAuthState] = useState(!!savedUser);
  const [modState, setModState] = useState(savedModState);

  const loginAction = async (data) => {
    axios
      .post("https://campus-connect.xyz:5001/users/login", data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token.split(' ')[1]);
        localStorage.setItem("user", res.data.username);
        localStorage.setItem("modState", res.data.mod == 1);
        setUser(res.data.username);
        setToken(res.data.token);
        setAuthState(true);
        setModState(res.data.mod);
        alert("Logged in as " + res.data.username);
        navigate("/");
      })
      .catch(() => {
        alert("Wrong Username or Password");
      });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setAuthState(false);
    setModState(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("modState");
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
