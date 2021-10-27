import styled from "styled-components";
import {Link} from "react-router-dom";

export const ButtonPrimary = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  margin-bottom: 40px;
  margin-top: 40px;

  &:hover {
    background: #FF6700;
  }
`

export const ButtonPrimaryLink = styled(Link) `
  display: block;
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  text-decoration: none;

  &:hover {
    background: #FF6700;
  }
`

export const ButtonSecondary = styled(Link)`
  margin: ${({ margin }) => margin ?? 0};
  font-weight: bold;
  color: #FF6700;
  display: block;
  transition: .3s;
  
  &:hover{
    color: #000;
  }
`

export const DeleteButton = styled.button`
      border: none;
      background-color: transparent;
      color: #b83c3c;
      cursor: pointer;
      margin-left: 10px;
      
      &:hover{
        text-decoration: underline;
      }
`