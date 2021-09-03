import React from "react";
import Flexbox from "../../../templates/Flexbox";

const InputRadio = ({labeltext, idRadio, nameRadio, valueRadio, checked}) => {

    return (
        <Flexbox>
            <label htmlFor={idRadio}>{labeltext}</label>
            <input type="radio" id={idRadio} name={nameRadio} value={valueRadio} defaultChecked={checked} />
        </Flexbox>
    )
}
export default InputRadio;