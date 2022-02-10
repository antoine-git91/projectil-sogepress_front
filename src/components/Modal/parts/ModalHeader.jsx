import React from 'react';
import styled from "styled-components";

const Header = styled.header`
  text-align: center;
  padding-bottom: 30px;

  h1{
    margin-top: 0;
  }
`

const ModalHeader = (props) => {

    return (
        <Header>
            {props.children}
        </Header>
    )
}
export default ModalHeader;