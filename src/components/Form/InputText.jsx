import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
      display: block;
      margin-top: 10px;
      margin-bottom: 20px;
      margin-right: 10px;
      padding: 5px 10px;
    `


const InputText = ({label, onChange, value, name, type}) => {

    return (
        <label>{label}
            <InputStyle type={{type} ? type :"text"} onChange={onChange} value={value} name={name} />
        </label>
    )
}

export default InputText;