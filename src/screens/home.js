import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import AddItems from "../components/addItems";
import Outputs from "../components/outputs";
import Translate from "../components/translate";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>..</h1>
      <Navbar collapseOnSelect variant="light">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#">Add</Nav.Link>

              <Nav.Link href="#deets">Outputs</Nav.Link>
              <NavDropdown title="Translate" id="basic-nav-dropdown">
                <NavDropdown.Item href="/translate/Indonesia">
                  to Indonesia
                </NavDropdown.Item>
                <NavDropdown.Item href="/translate/French">
                  to French
                </NavDropdown.Item>
                <NavDropdown.Item href="/translate/Kiswahili">
                  to Kiswahili
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          backgroundColor: "fbfbfd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          float: "center",
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={AddItems} />
            <Route exact path="/outputs" component={Outputs} />
            <Route exact path="/translate/:language" component={Translate} />
          </Switch>
        </Router>
        {/* <AddItems /> */}
        {/* <Outputs /> */}
        {/* <Translate /> */}
      </div>
    </div>
  );
}
