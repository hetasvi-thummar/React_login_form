import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Label,
} from "reactstrap";
import logo from "./Images/logo2.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("username");
  console.log(token);

  return (
    <div>
      <Navbar color="white" light expand="md" className="shadow">
        <NavbarBrand>
          <img className="logo" src={logo} alt="logo" />
        </NavbarBrand>
        <NavbarBrand>
          <h4 className="text-secondary">PASTEBIN</h4>
          <div>{token}</div>
        </NavbarBrand>
        {/* <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText>User</NavbarText>
        </Collapse> */}
      </Navbar>
    </div>
  );
};

export default Header;
