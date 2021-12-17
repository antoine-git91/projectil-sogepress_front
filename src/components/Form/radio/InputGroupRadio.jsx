import React from "react";
import InputRadio from "../radio/InputRadio";
import Flexbox from "../../../templates/Flexbox";
import styled from "styled-components";
import {f} from "react-select/dist/index-4bd03571.esm";

const GroupRadioStyle = styled.div`
      margin-bottom: 20px;
      
      p{
        margin-bottom: 10px;
        font-weight: 500;
      }
    `

const RadioStyle = styled.input`
      margin-right: 20px;
    `

const InputGroupRadio = ({ data, name, selected, setRadioChecked, label }) => {

    const getValue = (e) => {
        setRadioChecked(e.target.value)
        console.log(selected)
        console.log(e.target.value)
        console.log(e.target.value === selected)
    };

    return (
      <GroupRadioStyle>
        <p>{label}</p>
        <Flexbox>
          {data.map(( radio, i ) =>
              <Flexbox key={i}>
                  <label htmlFor={name}>{radio.label}</label>
                  <RadioStyle onChange={getValue} type="radio" id={radio.id} name={name} value={radio.value} checked={radio.value === selected} />
              </Flexbox>
          )}
        </Flexbox>
      </GroupRadioStyle>
    )
}
export default InputGroupRadio;