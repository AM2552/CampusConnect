import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/createThread";
import Thread from "./pages/Thread";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Registration from "./pages/Registration";
import AuthProvider from './helpers/AuthProvider';
import { useAuth } from "./helpers/AuthProvider";

function Navigation() {
  const auth = useAuth();

  return (
    <nav>
      <Link to="/"> Home Page</Link>
      {auth.authState && <Link to="/createthread"> Create a Thread</Link>}
      {auth.authState && <Link to="/logout"> Logout</Link>}
      {!auth.authState && <Link to="/login"> Login</Link>}
      {!auth.authState && <Link to="/register"> Register</Link>}
    </nav>
  );
}

function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleLoginClose = () => {
    setLoginPopupOpen(false);
  };

  const handleLogin = (username) => {
    // additional code for login
    setLoggedInUser(username);
  };

  

  return (
    
      <Router>
          <AuthProvider>
          <aside className="aside1"></aside>
          <header className="header">
            <Link to="/" className="homeCSS">Home Page</Link>
            <Link to="/login" className="loginCSS">Login</Link>
            
            <Link to="/logout" className="logoutCSS">Logout</Link>
          </header>
          <main className="main">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/thread/:id" exact element={<Thread />} />
              <Route path="/createthread" exact element={<CreateThread/>} />
              <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Registration />} />
            </Routes>
          </main>
          <aside className="aside2"> <Link id="createButton" to="/createthread">Create a Thread</Link></aside>
          <footer className="footer">

          </footer>
          </AuthProvider>
      </Router>
      
  );
}

export default App;
