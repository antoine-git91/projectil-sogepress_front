import styled from "styled-components";
import Flexbox from "../../templates/Flexbox";
import React from "react";

const InfoPageStyle = styled.p`
  text-align: right;
  margin-bottom: 30px;
  margin-right: 20px;
  
  & span{
    color: orangered;
    font-weight: bold;
  }
`

const InfoPage = ( { numberPage, numberOfPages, offset, totalItems } ) => {

    return (
        <Flexbox>
            <InfoPageStyle>Page {numberPage} sur {numberOfPages}</InfoPageStyle>
            <InfoPageStyle>Nombre de résultats ({totalItems})</InfoPageStyle>
            <InfoPageStyle>Nombre de résultats par page({offset})</InfoPageStyle>
        </Flexbox>
    )
}
export default InfoPage