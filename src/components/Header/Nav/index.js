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

  &:first-child{
    border-bottom: 1px solid #fff;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  
  &:last-child{
    border-top: 1px solid #fff;
    margin-top: 20px;
    padding-top: 20px;
  }
  
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
            <NavItem to="/magazines">Magazines</NavItem>
            { JSON.parse( localStorage.getItem('meUser' ) ).role === "ROLE_ADMIN" &&
                <NavItem to="/users">Commerciaux</NavItem>
            }
            <NavItem to="/my_account">Mon Profil</NavItem>
        </NavStyle>
    )
}
export default Nav;