import styled from "styled-components";

export const BoxTitle = styled.div`
  margin-bottom: 30px;

  span {
    font-weight: 300;
  } 
  
  a {
    font-weight: 500;
    font-size: 22px;
    color: #000;
      &:hover{
        text-decoration: underline;
      } 
  }
`

export const InfoContainer = styled.div`
display : grid; 
grid-template-columns: repeat(auto-fill, 250px);
`

export const InfoViewContainer = styled.div`
  width : 60%;
`

