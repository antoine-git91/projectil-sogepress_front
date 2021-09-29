import React from "react";
import styled from "styled-components";

const RelanceContainerStyle = styled.div`
margin-top: 20px;
border: 2px solid #FF6700;
padding-left: 20px;
`

const RelanceContainer = () => {

    return (

        <RelanceContainerStyle>
          <h2>Relance</h2>
                <ul>
                    <li>Relance n°1</li>
                    <li>Relance n°2</li>
                </ul>

        </RelanceContainerStyle>

    )
}

export default RelanceContainer;