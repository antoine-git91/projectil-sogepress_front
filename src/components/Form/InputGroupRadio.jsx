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
      return (
        <div onChange={this.onChangeValue}>
          <InputRadio labeltext="Choix n°1" idRadio="id1" nameRadio="groupe1" valueRadio="value1" />
          <InputRadio labeltext="Choix n°2" idRadio="id2" nameRadio="groupe1" valueRadio="value2" />
          <InputRadio labeltext="Choix n°3" idRadio="id3" nameRadio="groupe1" valueRadio="value3" />
        </div>
      );
    }
  }

export default InputGroupRadio;