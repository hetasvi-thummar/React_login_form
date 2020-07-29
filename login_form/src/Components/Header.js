import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import logo from "./Images/headerlogo.png";
import { useHistory } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

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
        <NavbarBrand>
          <img className="logo" src={logo} alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText className="pr-2 text-white">{user}</NavbarText>
          <NavbarText>
            <FaSignOutAlt onClick={logout} className="signout" />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
