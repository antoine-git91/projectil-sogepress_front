import React from "react";
import styled from "styled-components";

const BoxInfosStyle = styled.div`
  
  padding-right: 30px;
  padding-bottom: 20px;
  
  p{
    font-size: 18px;
    margin-top: 5px;
    font-weight: 400;
  }
  
  a{
    color: orangered;
    text-decoration: underline;
    
    &:hover{
      color: #3b3b3b;
    }
  }
  
  .title{
    font-size: 16px;
    font-weight: 700;
    margin-top: 0;
  }
`

const BoxInfos = ({titre, information, link}) => {

    return (
        <BoxInfosStyle>
            <p className="title">{titre}</p>
            {information && (
                link ? <a href={information}>{information}</a>
                    : <p>{information}</p>
            )}
            {/*{tags &&
                <Flexbox>
                    {tags.map( ( tag, i ) => <Tag key={ tag + i }>{tag}</Tag>)}
                </Flexbox>
            }*/}
        </BoxInfosStyle>
    )
}
export default BoxInfos;