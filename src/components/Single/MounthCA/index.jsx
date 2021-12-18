import React from "react";
import styled from "styled-components";

export const Item = styled.div`
display : flex;
flex-direction: column;
align-items: center;
margin: 0 30px;
`

export const ResultCa = styled.p`

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


const caItem = () => {

    return (
        <Item>
            <ResultCa>230€</ResultCa>
            <Cercle></Cercle>
            <JourMois>02/2021</JourMois>
        </Item>
    )
}
export default caItem;