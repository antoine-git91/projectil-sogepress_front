import React, { Component } from "react";
import InputRadio from "./InputRadio";


class InputGroupRadio extends Component {
    constructor() {
      super();
      this.state = {
        name: "React"
      };
      this.onChangeValue = this.onChangeValue.bind(this);
    }
  
    onChangeValue(event) {
      console.log(event.target.value);
    }
  
    render() {

      const data = this.props.data;
      const name = this.props.name;
      const selected = this.props.selected;

      return (
        <div onChange={this.onChangeValue}>

          {data.map((radio, i)=><InputRadio labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={i + 1 ===selected} />)}
          
        </div>
      );
    }
  }

export default InputGroupRadio;