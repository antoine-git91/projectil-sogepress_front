import React from 'react';
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  flex-grow: 2;
  align-items: flex-end;
`

const ModalFooter = (props) => {

    return (
        <Footer>
            {props.children}
        </Footer>
    )
}
export default ModalFooter;