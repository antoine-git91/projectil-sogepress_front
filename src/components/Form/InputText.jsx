import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
      display: block;
      margin-bottom: 20px;
      margin-top: 10px;
      margin-right: 10px;
      padding: 10px 20px;
    `


const InputText = ({label, onChange, value, name, type}) => {

    return (
        <label>{label}
            <InputStyle type={{type} ? type :"text"} onChange={onChange} value={value} name={name} />
        </label>
    )
}

export default InputText;