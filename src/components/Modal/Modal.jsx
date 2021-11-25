import React from 'react';
import styled from "styled-components";

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: RGBA(0,0,0,0.51);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
`

const ModalContainer = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: #fdfdfd;
  opacity: 1;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
  padding: 50px;
  display: flex;
  flex-direction: column;
`

const Modal = (props) => {

    return (
        <ModalOverlay>
            <ModalContainer>
                {props.children}
            </ModalContainer>
        </ModalOverlay>
    )
}
export default Modal;