import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useSelector} from "react-redux";
import {useGetCurrentUserQuery} from "../Redux/ApiProvider/jarvisAPIAuth";

function Canvas({obj}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-info" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Current User Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <strong>User ID: </strong>{obj.id};
          <strong>Name: </strong>{obj.name};
          <strong>Reference Number: </strong>{obj.reference_number};
          <strong>Phone No.: </strong>{obj.phone};
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const JarvisNavbar = () => {
  // const response = useGetCurrentUserQuery();

  // const [fulfilled, setFulfilled] = useState(false);
  // console.log("\nResponse: ", response)
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user)
  // const [obj, setObj] = useState('')
  // console.log("\nNav Status; ", response.status);
  //
  // if (response.status === 'fulfilled') {
    // const ui = user.find(item => item['current'] === true)
    // setObj(ui);
    // console.log("\nFullfilled User", user)
    // setFulfilled(true);
  // }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">JARVIS Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/opportunities")}>Opportunities</Nav.Link>
            <Nav.Link onClick={() => navigate("/clients")}>Clients</Nav.Link>
            <Nav.Link onClick={() => navigate("/signout")}>Sign Out</Nav.Link>
            {/*{fulfilled? <Canvas obj={obj}/> : null}*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default JarvisNavbar;