import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
} from "reactstrap";
import logo from "../Images/headerlogo.png";
import { useHistory } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const user = localStorage.getItem("username");
  const logout = () => {
    if (localStorage.removeItem("jwt")) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand className="pr-2">
          <img className="header-logo" src={logo} alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText>
            <FaUser className="usericon" />
          </NavbarText>
          <NavbarText className="pr-2 text-white">{user}</NavbarText>

          <NavbarText>
            <Button className="btn-sm">
              <FaSignOutAlt onClick={logout} className="signout" />
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
