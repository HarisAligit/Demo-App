import {Button} from "react-bootstrap";
import {Navigate, useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";

const SignOut = () => {

  const navigate = useNavigate();
  const status = localStorage.getItem("isAuthenticated", true);

  const signOut = () => {
    if (status === "true") {
      localStorage.setItem("isAuthenticated", false);
      navigate("/login")
    }
    else {
      return (
        <div>
          <Alert variant="warning">User Not Logged In!</Alert>;
        </div>
      )
    }
  }

  return (
    <div>
      <Button variant="danger" onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

export default SignOut;