import React from "react";
import styled from "styled-components";

const BoxInfosStyle = styled.div`
  max-width: 200px;
  
  p{
    font-size: 20px;
    
    &:last-child{
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
      margin-top: 5px;
    }
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