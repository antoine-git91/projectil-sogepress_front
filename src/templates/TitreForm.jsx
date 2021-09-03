import React from "react";
import styled from "styled-components";

const TitreFormStyle = styled.p`
      font-weight: 900;
      font-size: 16px;
      text-transform: uppercase;
    `


const TitreForm = ({titre}) => {

    return (
        <TitreFormStyle>{titre}</TitreFormStyle>
    )
}

export default TitreForm;