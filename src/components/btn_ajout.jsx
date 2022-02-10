import React from "react";
import plus from '../assets/images/plus.png';
import styled from "styled-components";

const BtnAjoutStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:after {
    content: url(${plus});
    margin-left: 10px;
`

const BtnAjout = ({text, add}) => {

    return (
        <BtnAjoutStyle onClick={(e) => add(e)}>{text}</BtnAjoutStyle>
    )
}

export default BtnAjout;