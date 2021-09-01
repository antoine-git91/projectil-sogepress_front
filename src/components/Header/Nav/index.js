import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const Nav = () => {

    const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`

    const NavItem = styled(Link)`
  padding: 10px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
`

    return(
        <Nav>
            <NavItem to="/">Accueil</NavItem>
            <NavItem to="/clients">Clients</NavItem>
            <NavItem to="/commandes">Commandes</NavItem>
            <NavItem to="/magazines">Magazines</NavItem>
            <NavItem to="/actions">Actions</NavItem>
            <NavItem to="/ventes">Ventes</NavItem>
            <NavItem to="/profil">Profil</NavItem>
        </Nav>
    )
}
export default Nav;