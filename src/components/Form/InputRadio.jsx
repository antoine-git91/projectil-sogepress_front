import React from "react";

const InputRadio = ({label, id, name}) => {

    return (
        <div>
            <input type="radio" id={id} name={name} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default InputRadio;