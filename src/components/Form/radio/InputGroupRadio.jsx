import React from "react";
import InputRadio from "../radio/InputRadio";
import Flexbox from "../../../templates/Flexbox";
import styled from "styled-components";

const GroupRadioStyle = styled.div`
      margin-bottom: 20px;
      
      p{
        margin-bottom: 10px;
        font-weight: 500;
      }
    `

const InputGroupRadio = ({ data, name, selected, setRadioChecked, label }) => {

    const getValue = (e) => {
        setRadioChecked(e.target.value)
    };

      return (
          <GroupRadioStyle>
            <p>{label}</p>
            <Flexbox onChange={getValue} >
              {data.map(( radio, i ) => <InputRadio key={i} labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={radio.value === selected} />)}
            </Flexbox>
          </GroupRadioStyle>
      )
  }
export default InputGroupRadio;