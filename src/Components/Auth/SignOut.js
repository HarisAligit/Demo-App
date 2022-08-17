import {Button} from "react-bootstrap";
import {Navigate} from "react-router-dom";

const SignOut = () => {

  const signOut = () => {
    if (localStorage.getItem("isAuthenticated", true))
    {
      localStorage.setItem("isAuthenticated", false)
      return (
        <div>
          <alert>Signed Out Successfully!</alert>;
          <Navigate to="\signin" />
        </div>
      )
    }
    else {
      return (
        <div>
          <alert>User Not Logged In!</alert>;
          <Navigate to="\signin" />
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