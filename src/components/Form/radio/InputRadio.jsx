import React from "react";
import Flexbox from "../../../templates/Flexbox";
import styled from "styled-components";

const InputRadio = ({labeltext, idRadio, nameRadio, valueRadio, checked}) => {

    const RadioStyle = styled.input`
      margin-right: 20px;
    `
    return (
            <Flexbox>
                <label htmlFor={idRadio}>{labeltext}</label>
                <RadioStyle type="radio" id={idRadio} name={nameRadio} value={valueRadio} defaultChecked={checked} />
            </Flexbox>
    )
}
export default InputRadio;