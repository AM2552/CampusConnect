import { useAuth } from "../helpers/AuthProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();
  auth.logOut();
  navigate("/");
}

export default Logout;