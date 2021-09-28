import React from "react";
import styled from 'styled-components';

const ToolNav = styled.nav`
  position: fixed;
  top: 0;
  width: calc(100vw - 200px);
  left: 200px;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #FF935B;
  z-index: 9999;
`

const ToolsBar = () => {
    return(
        <ToolNav>Toolsbar</ToolNav>
    )
}
export default ToolsBar;