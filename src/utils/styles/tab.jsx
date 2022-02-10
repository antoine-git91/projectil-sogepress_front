import styled from "styled-components";

export const BtnTabs = styled.button`
  background-color: transparent;
  color: black;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 300;
  border: transparent;
  transition: .3s;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: 30px;

  &:hover {
    color: #FF6700;
  }

  ${({active}) =>
    active && `
    color:#FF6700;
    border-bottom: 3px solid #FF6700;
    opacity: 1;
  `}
`