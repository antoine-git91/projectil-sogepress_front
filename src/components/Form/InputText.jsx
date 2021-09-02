import React, {useState} from "react";


const InputText = ({label, event, value}) => {
    return (
        <label>{label}
            <input type="text" onChange={event} value={value} />
        </label>
    )
}

export default InputText;