import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  display: block;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px;
`
const Label = styled.label`
  font-size: 16px;
  
  &.required:before{
    content: "* ";
    color: orangered;
  }
`

const InputText = ({label, onChange, value, name, type, required, placeholder, readOnly}) => {

    return (
        <Label className={required && "required"}>{label}
        <InputStyle type={{type} ? type :"text"} onChange={onChange} value={value} name={name} required={required} placeholder={placeholder} readOnly={readOnly} />
        </Label>
    )
}
export default InputText;