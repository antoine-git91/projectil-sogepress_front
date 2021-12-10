import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const NavStyle = styled.nav`
      display: flex;
      flex-direction: column;
    `

const NavItem = styled(NavLink)`
  padding: 10px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  
  &:hover{
    background-color: #fff;
    color: #FF6700;
  }
  
  &.active{
    background-color: #fff;
    color: #FF6700;
  }
`

const Nav = () => {

    return(
        <NavStyle>
            <NavItem exact to="/">Accueil</NavItem>
            <NavItem to="/clients">Clients</NavItem>
            <NavItem to="/commandes">Commandes</NavItem>
            {/*<NavItem to="/magazines">Magazines</NavItem>
            <NavItem to="/actions">Actions</NavItem>
            <NavItem to="/ventes">Ventes</NavItem>*/}
            <NavItem to="/my_account">Profil</NavItem>
        </NavStyle>
    )
}
export default Nav;