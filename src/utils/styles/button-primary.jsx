import React from 'react';
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
  margin-left: 10px;
  text-decoration: none;

  &:hover {
    background: #FF6700;
  }
`