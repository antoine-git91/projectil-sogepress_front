import styled from "styled-components";

export const BoxButton = styled.div`
display:flex;
justify-content: flex-end;
`

export const BoxTitle = styled.div`
& h1 {
    font-weight: 700;
}
& span {
    font-weight: 300;
}
& p {
    font-weight: 500;
    font-size: 22px;
}
`

export const SingleTitle = styled.h1`
display:flex;
align-items: center;
`

export const InfoContainer = styled.div`
display : grid; 
grid-template-columns: repeat(auto-fill, 250px);
`

export const InfoListeContainer = styled.div`
display : flex;
flex-direction: column;
`

export const InfoViewContainer = styled.div`
width : 60%;
`

