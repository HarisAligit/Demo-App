import './App.css';
import Login from "./Components/Auth/Login";
import SignOut from "./Components/Auth/SignOut";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Protected from "./Components/Auth/Protected";
import JarvisNavbar from "./Layout/JarvisNavbar";
import Clients from "./Components/Client/Clients";
import ClientDetail from "./Components/Client/ClientDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected />}>
          <Route path="clients/:id" element={<ClientDetail/>}/>
          <Route path="signout" element={<SignOut />} />
          {["user", "*", ""].map((path, index) =>
            <Route path={path} element={<JarvisNavbar />} key={index} />
          )}
          <Route path="clients" element={<Clients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
