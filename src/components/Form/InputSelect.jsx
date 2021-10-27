import React, {useEffect} from 'react';
import styled from "styled-components";
import {useState} from "react";

const SelectStyle = styled.select`
      display: block;
      padding: 10px 20px;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
      max-width: 185px;
    `

const InputSelect = ({name, data, label, option, selectValue, setSelectValue, optionValue, disabled}) => {

    const handleChange = (e) => {
        e.preventDefault();
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        setSelectValue({"value": e.target.value, "valueDisplay": el.text});
    }
    const inputSelect = document.querySelectorAll('.inputSelect');
    useEffect(() => {
        for(let i = 0; i < inputSelect.length; i++) {
            inputSelect[i].selectedIndex = 0
        }

    }, [disabled])
  return (
        <label>{label}
        <SelectStyle name={name} id={selectValue} onChange={(e) => handleChange(e)} disabled={disabled} className="inputSelect">

            <option value={optionValue}>{option}</option>
            {data ? data.map((select, key) => <option key={key} value={select.value}>{select.valueDisplay}</option>) : ''}

        </SelectStyle>
        </label>
  );

}

export default InputSelect;