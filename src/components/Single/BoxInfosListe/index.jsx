import React from "react";
import styled from "styled-components";

const BoxInfosListeStyle = styled.div`
display: flex;
max-width: 200px;
& p{
    font-size: 20px;
    margin-right: 10px;
}
`

const BoxInfosListe = ({numero, type, produit }) => {

    return (
        <BoxInfosListeStyle>
            <p>{numero}</p>
            <p>{type}</p>
            <p>{produit}</p>
        </BoxInfosListeStyle>

    )
}

export default BoxInfosListe;