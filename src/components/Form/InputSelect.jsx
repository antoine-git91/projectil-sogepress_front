import React from 'react';
import styled from "styled-components";

const SelectStyle = styled.select`
      display: block;
      padding: 10px 20px;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
      max-width: 185px;
    `

const InputSelect = ({data, label, option, selectValue, setSelectValue, optionValue, disabled}) => {

    const handleChange = (event) => {
      setSelectValue(event.target.value);
    }

  return (
        <label>{label}
        <SelectStyle value={selectValue} onChange={handleChange} disabled={disabled} >

            <option value={optionValue}>{option}</option>
            {data.map((select, key)=><option key={key} value={select.value}>{select.value}</option>)}

        </SelectStyle>
        </label>
  );

}

export default InputSelect;