import React from "react";

<<<<<<< HEAD
const InputRadio = ({label, id, name}) => {

    return (
        <div>
            <input type="radio" id={id} name={name} />
            <label htmlFor={id}>{label}</label>
=======
const InputRadio = ({labeltext, idRadio, nameRadio, valueRadio, checked}) => {

    return (
        <div>
            <input type="radio" id={idRadio} name={nameRadio} value={valueRadio} checked={checked}/>
            <label for={idRadio}>{labeltext}</label>
>>>>>>> develop
        </div>
    )
}

export default InputRadio;