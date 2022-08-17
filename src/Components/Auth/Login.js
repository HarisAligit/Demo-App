import {Alert, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import { useSignInMutation } from '../../Redux/Slice/authSlice'
import {Navigate} from "react-router-dom";

const Login = () => {

  let formSubmitError;
  let status = localStorage.getItem("isAuthenticated", true);
  const [signIn, response] = useSignInMutation();
  const [postForm, setPostForm] = useState('Submit');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault()
    let formData = {
      email: email,
      password: password,
    };
    try {
      const response = await signIn(formData).unwrap();
      if (response) {
        localStorage.setItem("isAuthenticated", true);
        setAlert(2)
      }
    }
    catch (err) {
      console.log(`Request Failed!\n ${err.data.errors}`)
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