import styled from "styled-components";
import {Link} from "react-router-dom";

export const ButtonPrimary = styled.button`
  background-color: #FF6700;
  color: #fff;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  margin: ${({ margin }) => margin ?? 0};

  &:hover {
    background: #000;
  }
`

export const ButtonPrimaryLink = styled(Link) `
        font-size: 14px;
  background-color: #FF6700;
  color: #fff;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  margin: ${({ margin }) => margin ?? 0};
  border-right: 1px solid #fff;

  &:hover {
    background: #000;
  }
`

export const ButtonSecondaryLink = styled(Link)`
  margin: ${({ margin }) => margin ?? 0};
  font-weight: bold;
  color: #FF6700;
  display: block;
  transition: .3s;
  
  &:hover{
    color: #000;
  }
`

export const ButtonSecondary = styled.button`
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