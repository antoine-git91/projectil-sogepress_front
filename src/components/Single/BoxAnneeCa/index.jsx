import React from "react";
import styled from "styled-components";

const BoxAnneeCaStyle = styled.div`
    display: flex;
    margin-bottom: 50px;
}
`

export const MoisBox = styled.div`
display : flex;
flex-direction: column;
align-items: center;
margin: 0 30px;
`

export const ResultMois = styled.p`

`

export const Cercle = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: lightgrey;
margin: 30px 0;
`

export const JourMois = styled.p`

`


const BoxAnneeCa = () => {

    return (
        <BoxAnneeCaStyle>
            <MoisBox>
                <ResultMois>230€</ResultMois>
                <Cercle></Cercle>
                <JourMois>02/2021</JourMois>
            </MoisBox>
            <MoisBox>
                <ResultMois>230€</ResultMois>
                <Cercle></Cercle>
                <JourMois>02/2021</JourMois>
            </MoisBox>
            <MoisBox>
                <ResultMois>230€</ResultMois>
                <Cercle></Cercle>
                <JourMois>02/2021</JourMois>
            </MoisBox>
            <MoisBox>
                <ResultMois>230€</ResultMois>
                <Cercle></Cercle>
                <JourMois>02/2021</JourMois>
            </MoisBox>
            <MoisBox>
                <ResultMois>230€</ResultMois>
                <Cercle></Cercle>
                <JourMois>02/2021</JourMois>
            </MoisBox>
        </BoxAnneeCaStyle>

    )
}

export default BoxAnneeCa;