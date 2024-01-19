import React, { useState } from "react";
import "./App.css";
import "./Login.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/createThread";
import Thread from "./pages/Thread";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Registration from "./pages/Registration";
import AuthProvider from './helpers/AuthProvider';
import { useAuth } from "./helpers/AuthProvider";




// TODO rename
function Navigation() {
  const auth = useAuth();

  const renderAuthButton = () => {
    if (auth.authState) {
      // User is logged in, display logout button
      return (
      <div>
      <Link to="/" className="homeCSS">Home Page</Link>
      <Link to="/logout" className="logoutCSS">Logout</Link>
      </div>
      )
    } else { 
      // User is not logged in, display login button
      return <Navigate to="/login"/>
    }
  };

  return (
    <>
      {renderAuthButton()}
    </>
  );
}

// change to button
function NavigationCreateThread() {
  const auth = useAuth();

  const navCreaThr = () => {
    if (auth.authState) {
      // User is logged in, display logout button
      return (
      <>
        <Link id="createButton" to="/createthread">Create Thread</Link>
      </>
      )
    } else { 
    }
  };
  return (
    <>
      {navCreaThr()}
    </>
  );
}


function App() {
const auth = useAuth();
  return (
      <Router>
          <AuthProvider>
          <aside className="aside1"></aside>
          <header className="header">
          <Link to="/" className="homeCSS">Home Page</Link>
          <Link to="/logout" className="logoutCSS">Logout</Link>
          </header>
          <main className="main">
          <Routes>
          <Route path="/" exact element={<Home />} />
            <Route path="/thread/:id" exact element={<Thread />} />
            <Route path="/createthread" exact element={<CreateThread/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          </main>
          <aside className="aside2"> 
            <NavigationCreateThread/>
          </aside>
          <a class="twitter-timeline"  href="https://twitter.com/FHCampusWien?ref_src=twsrc%5Etfw">Tweets by FHCampusWien</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <footer className="footer"></footer>
          </AuthProvider>
      </Router>
  );
}
export default App;