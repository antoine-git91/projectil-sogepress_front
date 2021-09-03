import React from 'react';
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";

const SelectStyle = styled.select`
      display: block;
    `

class InputSelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'coconut'};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    render() {

        const data = this.props.data;
        const label = this.props.label;

      return (
            <label>{label}
            <SelectStyle value={this.state.value} onChange={this.handleChange}>

                <option>--Type de support</option>
                {data.map((select, key)=><option key={key} value={select.id}>{select.value}</option>)}
            
            </SelectStyle>
            </label>
      );
    }
}

export default InputSelect;