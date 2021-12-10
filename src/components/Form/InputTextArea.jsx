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

const InputTextArea = ({label,commentaireId, name,commentaireRows,commentaireCols,onChange}) => {

    return (
        <TextAreaStyle>{label}
        <textarea id={commentaireId} name={name} rows={commentaireRows} cols={commentaireCols} onChange={onChange} />
        </TextAreaStyle>
    )

}
export default InputTextArea;