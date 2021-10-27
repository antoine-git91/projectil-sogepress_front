import React from 'react';
import styled from "styled-components";
import styleMessage from '../../utils/styles/responseMessageStatut.css'

const MessageBox = styled.div`
  padding: 20px 25px;
  position: fixed;
  top: 59px;
  right: 0;
  transform: translateX(100%);
  min-width: 400px;
  z-index: 9999;
  animation: 6s ease alternate showMessage;
  opacity: 0;
  background-color: #b0f5d4;
  
  @keyframes showMessage {
    15% {
      opacity: 1;
      transform: translateX(0);
    }
    80% {
      opacity: .8;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
    }
  }

  p {
    font-size: 16px
  }
`

const MessageTitle = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
`

const MessageText = styled.p`
  margin-bottom: 10px;
`


const Success = ({messageTitle, messageText, statut}) => {

    return (
        <MessageBox>
            <MessageTitle>{messageTitle}</MessageTitle>
            <MessageText>{messageText}</MessageText>
        </MessageBox>
    )

};
export default Success;