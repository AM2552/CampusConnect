import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/createThread";
import Thread from "./pages/Thread";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Registration from "./pages/Registration";
import AuthProvider from './helpers/AuthProvider';
import { useAuth } from "./helpers/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import BanUser from "./BanUser";

function HomeNav() {
  const auth = useAuth();

  const renderHomeButton = () => {
    if (auth.authState) {
      // User is logged in, display logout button
      return (
        <div>
          <div className="logoutBtnDivHome">
            <Link to="/" >
              <button className="homeCSS">
              Home Page
              </button>
              </Link>
            </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderHomeButton()}
    </>
  );
}


function LogoutNav() {
  const auth = useAuth();
  const username = Login.username;

  const renderLogoutButton = () => {
    if (auth.authState) {
      // User is logged in, display logout button
      return (
        <div>
          <div className="logoutBtnDivHome">
          <button className="userNameHome">
            Username
          </button> 
          <div className="logoutCSSDiv">
            <Link to="/logout">
              <button className="logoutCSS">
              Logout
              </button>
            </Link>
            </div>  

          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderLogoutButton()}
    </>
  );
}



function NavigationCreateThread() {
  const auth = useAuth();

  const navCreaThr = () => {
    if (auth.authState) {
      // User is logged in, display logout button
      return (
      <div className="createButtonDiv"> 
        <Link className="createButton" to="/createthread">Create Thread</Link>
      </div>
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
  return (
      <Router>
        <AuthProvider>
          <aside className="aside1"></aside>
          <header className="header1">
            <HomeNav/>
        </header>
        <header className="header2">
        <div>
            <h1 className="campusHeadline">
              CampusConnect
            </h1>
            </div>
        </header>
        <header className="header3">
          <LogoutNav/>
        </header>
          <main className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/thread/:id" element={
            <ProtectedRoute>
              <Thread />
            </ProtectedRoute>
          } />
          <Route path="/createthread" element={
            <ProtectedRoute>
              <CreateThread />
            </ProtectedRoute>
          } />
          </Routes>
          </main>
          <aside className="aside2"> 
            <NavigationCreateThread/>
            <BanUser/>
          </aside>
          <a class="twitter-timeline"  href="https://twitter.com/FHCampusWien?ref_src=twsrc%5Etfw">Tweets by FHCampusWien</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <footer className="footer"></footer>
          </AuthProvider>
      </Router>
  );
}
export default App;