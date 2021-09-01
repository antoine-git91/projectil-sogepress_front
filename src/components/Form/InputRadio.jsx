import React from "react";

const InputRadio = ({labeltext, idRadio, nameRadio, valueRadio}) => {

    return (
        <div>
            <input type="radio" id={idRadio} name={nameRadio} value={valueRadio} />
            <label for={idRadio}>{labeltext}</label>
        </div>
    )
}

export default InputRadio;