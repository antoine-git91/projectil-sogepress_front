import React from 'react'
import styled from "styled-components";

const SpinnerParent = styled.div`
  height: ${({height}) => height ?? "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpinnerStyle = styled.div`

  display: flex;
  align-items: center;
  position: relative;
  width: 80px;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #f5b9a0;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ff7547 transparent transparent transparent;
  }

  &.little{
    width: 20px;
    height: 20px;
    margin-bottom: 0px;
    
    div{
      width: 18px;
      height: 18px;
      border: 3px solid #f5b9a0;
      border-color: #ff7547 transparent transparent transparent;
    }
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Spinner = (props) => {

    return (
        <SpinnerParent height={props.height}>
            <SpinnerStyle className={props.className}>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
            </SpinnerStyle>
        </SpinnerParent>
    )
}
export default Spinner;