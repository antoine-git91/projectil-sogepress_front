import React from 'react';
import styled from "styled-components";

const SelectStyle = styled.select`
      display: block;
      padding: 10px 20px;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
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

                <option>{this.props.option}</option>
                {data.map((select, key)=><option key={key} value={select.id}>{select.value}</option>)}
            
            </SelectStyle>
            </label>
      );
    }
}

export default InputSelect;