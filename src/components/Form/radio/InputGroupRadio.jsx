import React from "react";
import InputRadio from "../radio/InputRadio";
import Flexbox from "../../../templates/Flexbox";
import styled from "styled-components";
import {f} from "react-select/dist/index-4bd03571.esm";

const GroupRadioStyle = styled.div`
  margin-bottom: 20px;
`

const RadioStyle = styled.input`
  margin-right: 20px;
`

const Label = styled.p`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 16px;
  
  &.required:before{
    content: "* ";
    color: orangered;
  }
`

const InputGroupRadio = ( { data, name, selected, setRadioChecked, label, required } ) => {

    const getValue = (e) => {
        setRadioChecked({"value": e.target.value, "id": e.target.id})
        console.log(e.target.name)
    };

    return (
      <GroupRadioStyle>
        <Label className={required && "required"}>{label}</Label>
        <Flexbox>
          {data.map(( radio, i ) =>
              <Flexbox key={i}>
                  <label htmlFor={name}>{radio.label}</label>
                  <RadioStyle onChange={getValue} type="radio" id={radio.id} name={name} value={radio.value} checked={radio.value === selected.value} />
              </Flexbox>
          )}
        </Flexbox>
      </GroupRadioStyle>
    )
}
export default InputGroupRadio;