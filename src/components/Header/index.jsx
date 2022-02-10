import React from "react";
import styled from 'styled-components';
import ToolsBar from "./ToolsBar";
import Nav from "./Nav";
import logo from "../../assets/images/logo_projectil.png"
import {Link} from "react-router-dom";

const NavContainer = styled.nav`
  width: 200px;
  height: 100vh;
  background: rgb(252, 154, 87);
  background: linear-gradient(0deg, rgb(253, 147, 62) 0%, rgba(247, 127, 45, 1) 35%, rgba(255, 103, 0, 1) 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

const LogoHeader = styled.img`
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  margin-bottom: 55px;
`


const Header = () => {

    return (
        <NavContainer>
            <Link to={"/"}><LogoHeader src={logo} alt="logo de l'agence Projectil-Sogepress"/></Link>
            <h1><span className={"screen-reader-text"}>Projectil-Sogepress</span></h1>
            <Nav />
            <ToolsBar />
        </NavContainer>
    )
}
export default Header