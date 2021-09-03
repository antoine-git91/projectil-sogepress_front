import React from "react";
import InputRadio from "../radio/InputRadio";
import Flexbox from "../../../templates/Flexbox";


const InputGroupRadio = ({ data, name, selected, onchange }) => {

      return (
        <Flexbox onChange={onchange} >

          {data.map(( radio, i ) => <InputRadio key={i} labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={radio.value === selected} />)}
        </Flexbox>
      )
  }
export default InputGroupRadio;