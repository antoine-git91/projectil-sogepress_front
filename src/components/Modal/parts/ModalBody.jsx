import React from 'react';
import styled from "styled-components";

const ModalContentBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: ${({justify}) => justify ?? "flex-start"};
  align-items: ${({align}) => align ?? "flex-start"};
  overflow-y: ${({ overflowScrollY }) => overflowScrollY ? overflowScrollY : "hidden"};

  p{
    margin-bottom: 8px;
    font-weight: 600;
    span{
      font-weight: initial;
    }
  }
`

const ModalBody = (props) => {

    return (
        <ModalContentBody overflowScrollY={props.overflowScrollY} justify={props.justify} align={props.align}>
            {props.children}
        </ModalContentBody>
    )
}
export default ModalBody;