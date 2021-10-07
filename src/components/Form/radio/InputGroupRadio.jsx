import React from "react";
import InputRadio from "../radio/InputRadio";
import Flexbox from "../../../templates/Flexbox";
import styled from "styled-components";

const GroupRadioStyle = styled.div`
      margin-bottom: 20px;
      
      p{
        margin-bottom: 10px;
      }
    `

const InputGroupRadio = ({ data, name, selected, setTypeClientRadio, label }) => {

    const getValueType = (e) => {
        setTypeClientRadio(e.target.value)
    };

      return (
          <GroupRadioStyle>
            <p>{label}</p>
            <Flexbox onChange={getValueType} >
              {data.map(( radio, i ) => <InputRadio key={i} labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={radio.value === selected} />)}
            </Flexbox>
          </GroupRadioStyle>
      )
  }
export default InputGroupRadio;