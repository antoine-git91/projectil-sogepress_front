import React from 'react';
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  padding-top: 30px;
  justify-content: center;
`

const ModalFooter = (props) => {

    return (
        <Footer>
            {props.children}
        </Footer>
    )
}
export default ModalFooter;