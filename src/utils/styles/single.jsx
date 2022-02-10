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

export const HistoriqueViewContainer = styled.div`
width: 100%;
`

export const HeaderHistoriqueView = styled.div`
  width: 100%;
  display : flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`

export const ChiffreResultContainer = styled.div`
display: flex;
flex-direction: column
`


export const HistoriqueDataContainer = styled.div`

`

export const InfoContainer = styled.div`
/*  display : grid; 
  grid-template-columns: repeat(auto-fill, 45%);
  gap: 10px;
  margin-bottom: 20px;*/
`

export const ContactContainer = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 10px;
`

export const InfoViewContainer = styled.div`
  background-color: #ffeee6;
  border-radius: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 18px 24px;

  &.validated {
    background-color: #c4c4c4;
  }

  h2 {
    margin-top: 0;
  }
`

export const ContactViewContainer = styled.div`
 display: flex;
 flex-direction: column;
`

