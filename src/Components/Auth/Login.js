import {Alert, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import { useSignInMutation } from '../../Redux/ApiProvider/jarvisAPIOpen'
import { useGetCurrentUserMutation} from "../../Redux/ApiProvider/jarvisAPIAuth";
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToUser} from "../../Redux/ApiProvider/jarvisSlice";
import {combineReducers} from "@reduxjs/toolkit";

const Login = () => {

  let formSubmitError;
  let status = localStorage.getItem("isAuthenticated", true);
  const [getCurrentUser, response] = useGetCurrentUserMutation();
  const [signIn, {data}] = useSignInMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(0);
  // console.log("\nData: ", data);


  useEffect(() => {
    if (data)
    {
      localStorage.setItem("isAuthenticated", true);
      try {
        getCurrentUser().unwrap();
        console.log("Response", response.data);
      }
      catch (err) {
        console.log("\nCaught an Error!")
      }
      setAlert(2)
      console.log("\nData: ", data);
    }
  }, [data])

  const onSubmit = async (e) => {
    e.preventDefault()
    let formData = {
      email: email,
      password: password,
    };
    try {
      await signIn(formData).unwrap();
      console.log("\nResponse: ");
    }
    catch (err) {
      console.log(err);
      console.log("\nResponseggg: ");
      localStorage.setItem("isAuthenticated", false);
      setAlert(1)
    }
  }

  return (
    <div>
      {status === "true" && <Navigate to="/user"  replace={true} />}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;