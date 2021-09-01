import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import ToolsBar from "./ToolsBar";
import Nav from "./Nav";

const NavContainer = styled.nav`
  width: 250px;
  height: 100vh;
  background-color: antiquewhite;
  position: fixed;
  top: 0;
  left: 0;
`

const Title = styled.h1`
  font-size: 20px;
  padding: 20px;
`


const Header = () => {
    return (
        <NavContainer>
            <Title>Projectil-Sogepress</Title>
            <Nav />
            <ToolsBar />
        </NavContainer>
    )
}
export default Header