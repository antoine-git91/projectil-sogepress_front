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
export const SingleMainContainer = styled.div`
display : flex;
`

export const HistoriqueViewContainer = styled.div`
width: 100%;
`

export const HeaderHistoriqueView = styled.div`
width: 100%;
display : flex;
justify-content: space-between;
`

export const ChiffreDateContainer = styled.div`
display: flex;
`

export const ChiffreResultContainer = styled.div`
display: flex;
flex-direction: column
`


export const HistoriqueDataContainer = styled.div`

`

export const InfoContainer = styled.div`
display : grid; 
grid-template-columns: repeat(auto-fill, 250px);
`

export const ContactContainer = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, 250px);
`

export const InfoViewContainer = styled.div`
  width : 60%;
`

export const ContactViewContainer = styled.div`
width: 40%;
 display: flex;
 flex-direction: column;
`

