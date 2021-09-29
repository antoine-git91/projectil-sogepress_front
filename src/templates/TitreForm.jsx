import React from "react";
import styled from "styled-components";

const TitreFormStyle = styled.h2`
      font-weight: 900;
      font-size: 20px;
      text-transform: uppercase;
    `

const TitreForm = ({titre}) => {

    return (
        <TitreFormStyle>{titre}</TitreFormStyle>
    )
}

export default TitreForm;