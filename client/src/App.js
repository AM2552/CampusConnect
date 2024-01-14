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
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createthread" element={<CreateThread />} />
            <Route path="/thread/:id" element={<Thread />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;