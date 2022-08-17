import './App.css';
import Login from "./Components/Auth/Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Protected from "./Components/Auth/Protected";
import { connect } from "react-redux";
import {jarvisClient} from "./BaseEndpoint/jarvisClient";

const serviceAPI = async (dispatch, state) => {
  let response = await jarvisClient.post('/auth/sign_in', {
    id: payload.newPost.id,
    title: payload.newPost.title,
    body: payload.newPost.body,
  });
  if (res.ok) {
    let json = await res.json();
    dispatch({ type: 'ASYNC', payload: json})
  } else {
    dispatch({ type: 'ASYNC', payload: "Err! Fetch Failed!" })
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Protected />}>
          <Route path="/signout" element={<SignOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) =>
{
  console.log("I am state: ", state)
  return {
    text: state?.form?.text,
    foo: state?.form?.foo,
    auth: state?.form?.auth,
    payload: state?.form?.payload,
  }};

const ConnectedApp = connect(mapStateToProps)(App);

export { ConnectedApp};

export default App;
