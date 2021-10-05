import React from "react";
import styled from "styled-components";
import Flexbox from "../../../templates/Flexbox";

const BoxInfosStyle = styled.div`
  max-width: 200px;
  
  p{
    font-size: 18px;
    margin-top: 5px;
    font-weight: 400;
  }
  
  .title{
    font-size: 14px;
    font-weight: 700;
  }
`
const Tag = styled.p`
  display: block;
  padding: 10px;
  border-radius: 4px;
  background-color: #dedede;
  margin-right: 10px;
  margin-top: 5px;
`

const BoxInfos = ({titre, information, tags}) => {

    return (
        <BoxInfosStyle>
            <p className="title">{titre}</p>
            {information && <p>{information}</p>}
            {tags && <Flexbox>
                {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </Flexbox>}

        </BoxInfosStyle>

    )
}

export default BoxInfos;