import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
      display: block;
      margin-top: 10px;
      margin-bottom: 20px;
      margin-right: 10px;
      padding: 5px 10px;
    `


const InputText = ({label, event, value, name}) => {

    return (
        <label>{label}
            <InputStyle type="text" onChange={event} value={value} name={name}/>
        </label>
    )
}

export default InputText;