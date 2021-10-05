import React from "react";
import styled from 'styled-components';

const ToolNav = styled.nav`
  position: fixed;
  top: 0;
  width: calc(100vw - 240px);
  left: 200px;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #FF935B;
  z-index: 9999;
`

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  display: block;
  margin-left: auto;
  transition: .2s;

  &:hover {
    color: #d01c1c;
  }
`

const ToolsBar = () => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }
    return(
        <ToolNav>
            <LogoutButton onClick={logout}>Déconnexion</LogoutButton>
        </ToolNav>
    )
}
export default ToolsBar;