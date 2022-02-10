import React from "react";
import styled from "styled-components";

const TextAreaStyle = styled.label`
    flex-direction: column;
    margin-bottom: 20px;
  margin-left: 50px;
    font-size: 16px;
  display: block;
  
  &.required:before{
    content: "* ";
    color: orangered;
  }
  & textarea{
    margin-top: 10px;
    display: block;
    border-radius: 5px;
    max-width: 700px;
    width: 100%;
    padding: 10px;
  }
`

const InputTextArea = ( { label, commentaireId, name, commentaireRows, commentaireCols, onChange, placeholder, value, required } ) => {

    return (
        <TextAreaStyle className={required && "required"}>{label}
            <textarea id={commentaireId} name={name} rows={commentaireRows} cols={commentaireCols} onChange={onChange} placeholder={placeholder} value={value} required={required && "required"} />
        </TextAreaStyle>
    )

}
export default InputTextArea;