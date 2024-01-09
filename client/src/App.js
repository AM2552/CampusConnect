import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/createThread";
import Thread from "./pages/Thread";

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
          <aside className="aside1"></aside>
          <header className="header">
            <Link to="/"> Home Page</Link>
          </header>
          <main className="main">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/thread/:id" exact element={<Thread />} />
              <Route path="/createthread" exact element={<CreateThread/>} />
            </Routes>
          </main>
          <aside className="aside2"> <Link id="createButton" to="/createthread">Create a Thread</Link></aside>
          <footer className="footer"></footer>
      </Router>
  );
}

export default App;
