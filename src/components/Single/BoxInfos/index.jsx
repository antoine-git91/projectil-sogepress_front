import React from "react";
import styled from "styled-components";

const BoxInfosStyle = styled.div`
max-width: 200px;
&: p{
    font-size: 20px;
}
`

const BoxInfos = ({titre, information}) => {

    return (
        <BoxInfosStyle>
            <p>{titre}</p>
            <p>{information}</p>
        </BoxInfosStyle>

    )
}

export default BoxInfos;