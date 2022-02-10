import React, {useContext} from "react";
import styled from 'styled-components';
import ToolBarProfile from "./ToolBarProfile";
import {UserContext} from "../../../pages/App";

const ToolNav = styled.nav`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: calc(100vw - 300px);
  left: 200px;
  padding: 12px 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #FF935B;
  z-index: 9999;
`

const Welcome = styled.p`
  display: block;
  
  span{
    font-weight: bold;
  }
`

const ToolsBar = () => {

    const meUser = useContext(UserContext);
    console.log(meUser)

    return(
        <ToolNav>
            <Welcome>Bonjour <span>{ meUser && (meUser.nom + " " + meUser.prenom) }</span></Welcome>
            <ToolBarProfile />
        </ToolNav>
    )
}
export default ToolsBar;