import React, {useEffect} from 'react';
import styled from "styled-components";

const SelectStyle = styled.select`
  display: block;
  max-width: 185px;
  border-radius: 5px;
  padding: ${({padding}) => padding ?? "10px 20px"};
  margin: ${({margin}) => margin ?? "10px 10px 20px 0"};

  & option {
    &:first-child {
      background-color: #ffeee5;
    }
  }
`

const Label = styled.label`
  font-size: 16px;
  display: block;
  
  &.required:before{
    content: "* ";
    color: orangered;
  }
`

const InputSelect = ( { name, data, label, option, selectValue, setSelectValue, optionValue, disabled, required, padding, margin } ) => {

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
    <Label className={required && "required"}>{label}
    <SelectStyle name={name} id={selectValue} onChange={(e) => handleChange(e)} disabled={disabled} required={required} margin={margin} padding={padding}>
        <option value={optionValue}>{option}</option>
        {data ? data.map((select, key) => <option key={key} value={select.value} >{select.valueDisplay}</option>) : ''}
    </SelectStyle>
    </Label>
  );

}

export default InputSelect;