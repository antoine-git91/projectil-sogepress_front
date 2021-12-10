import React from 'react';
import styled from "styled-components";

const ModalContentBody = styled.div`
  width: 100%;
  height: 70%;
  padding: 20px 0;
  overflow-y: scroll;

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
        <ModalContentBody>
            {props.children}
        </ModalContentBody>
    )
}
export default ModalBody;