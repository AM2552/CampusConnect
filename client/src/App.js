import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import createThread from "./pages/createThread";
import Thread from "./pages/Thread";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createthread"> Create a Thread</Link>
        <Link to="/"> Home Page</Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createthread" exact Component={createThread} />
          <Route path="/thread/:id" exact element={<Thread />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
