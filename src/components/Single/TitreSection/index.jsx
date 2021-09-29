import React from "react";
import styled from "styled-components";

const TitreSectionStyle = styled.div`
font-size: 20px;
font-weight: 600;
}
`

const TitreSection = ({titre}) => {

    return (

        <TitreSectionStyle>
            <h2>{titre}</h2>
        </TitreSectionStyle>

    )
}

export default TitreSection;