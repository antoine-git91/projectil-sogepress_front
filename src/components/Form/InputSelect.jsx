import React, {useEffect} from 'react';
import styled from "styled-components";

const SelectStyle = styled.select`
  display: block;
  padding: 10px 20px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  max-width: 185px;
`

const Label = styled.label`
  font-size: 16px;
  display: block;
  
  &.required:before{
    content: "* ";
    color: orangered;
  }
`

const InputSelect = ( { name, data, label, option, selectValue, setSelectValue, optionValue, disabled, required} ) => {

    const handleChange = (e) => {
        e.preventDefault();
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        setSelectValue({"value": e.target.value, "valueDisplay": el.text});
    }

    const allInputsSelect = document.getElementsByTagName('select');
    useEffect(() => {
        for(let i = 0; i < allInputsSelect.length; i++) {
            if(disabled === "true"){
                allInputsSelect[i].selectedIndex = 0
            }
        }
    }, [disabled])

  return (
      <>
        <Label className={required && "required"}>{label}</Label>
        <SelectStyle name={name} id={selectValue} onChange={(e) => handleChange(e)} disabled={disabled} required={required}>
            <option value={optionValue}>{option}</option>
            {data ? data.map((select, key) => <option key={key} value={select.value} >{select.valueDisplay}</option>) : ''}
        </SelectStyle>
      </>
  );

}

export default InputSelect;