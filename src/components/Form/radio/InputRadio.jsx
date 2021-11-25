import React from "react";
import Flexbox from "../../../templates/Flexbox";
import styled from "styled-components";

const RadioStyle = styled.input`
      margin-right: 20px;
    `

const InputRadio = ({labeltext, idRadio, nameRadio, valueRadio, checked}) => {


    return (
            <Flexbox>
                <label htmlFor={idRadio}>{labeltext}</label>
                <RadioStyle type="radio" id={nameRadio + idRadio} name={nameRadio} value={valueRadio} defaultChecked={checked} />
            </Flexbox>
    )
}
export default InputRadio;