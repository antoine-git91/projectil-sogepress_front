import React from "react";
import styled from 'styled-components';

const ToolNav = styled.nav`
  position: fixed;
  top: 0;
  width: calc(100vw - 250px);
  left: 250px;
  padding: 20px;
  background-color: aqua;
`

const ToolsBar = () => {
    return(
        <ToolNav>Toolsbar</ToolNav>
    )
}
export default ToolsBar;