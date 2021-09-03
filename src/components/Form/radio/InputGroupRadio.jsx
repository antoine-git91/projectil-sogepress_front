import React from "react";
import InputRadio from "./InputRadio";
import Flexbox from "../../../templates/Flexbox";
import {useState} from "react";


const InputGroupRadio = ({data, name, selected }) => {

    const [itemSelect, setItemSelect] = useState(selected);

      return (
        <Flexbox onChange={e => setItemSelect(e.target.value)} >

          {data.map(( radio, i ) => <InputRadio key={i} labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={radio.value === itemSelect} />)}
          
        </Flexbox>
      )
  }
export default InputGroupRadio;