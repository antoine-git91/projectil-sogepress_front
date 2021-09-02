import React, { Component } from "react";
import InputRadio from "./InputRadio";
import Flexbox from "../../templates/Flexbox";


const InputGroupRadio = ({label, id, name, }) => {

    const [selected, setSelected] = '';
  
    const onChangeValue = (event) => {
      console.log(event.target.value);
    }
<<<<<<< HEAD

  return (
    <Flexbox onChange={onChangeValue}>
      <InputRadio labeltext="Choix n°1" idRadio="id1" nameRadio="groupe1" valueRadio="value1" />
      <InputRadio labeltext="Choix n°2" idRadio="id2" nameRadio="groupe1" valueRadio="value2" />
      <InputRadio labeltext="Choix n°3" idRadio="id3" nameRadio="groupe1" valueRadio="value3" />
    </Flexbox>
  );

=======
  
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
>>>>>>> develop
  }

export default InputGroupRadio;