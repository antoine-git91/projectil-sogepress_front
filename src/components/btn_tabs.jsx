import React from "react";
import plus from './plus.png';
import styled from "styled-components";

const BtnTabsStyle = styled.button`
  background-color: #ECECEC;
  border: none;
  color: black;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 300;
  border: 1px solid #BCBCBC; 
`

const BtnTabs = ({text, add}) => {

    return (

        <BtnTabsStyle onClick={add}>{text}</BtnTabsStyle>

    )
}

export default BtnTabs;