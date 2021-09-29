import React from "react";
import styled from "styled-components";

const TextAreaStyle = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  & textarea{
    margin-top: 10px;
  }
`

const InputTextArea = ({label,commentaireId,commentaireName,commentaireRows,commentaireCols}) => {

    return (
        <TextAreaStyle>{label}
        <textarea id={commentaireId} name={commentaireName} rows={commentaireRows} cols={commentaireCols} />
        </TextAreaStyle>
    )
}

export default InputTextArea;