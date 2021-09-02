import React from "react";

const InputRadio = ({labeltext, idRadio, nameRadio, valueRadio, checked}) => {

    return (
        <div>
            <input type="radio" id={idRadio} name={nameRadio} value={valueRadio} checked={checked}/>
            <label for={idRadio}>{labeltext}</label>
        </div>
    )
}

export default InputRadio;