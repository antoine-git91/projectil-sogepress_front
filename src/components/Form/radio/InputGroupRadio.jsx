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

const InputGroupRadio = ({ data, name, selected, onchange, label }) => {

      return (
          <GroupRadioStyle>
            <p>{label}</p>
            <Flexbox onChange={onchange} >
              {data.map(( radio, i ) => <InputRadio key={i} labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={radio.value === selected} />)}
            </Flexbox>
          </GroupRadioStyle>
      )
  }
export default InputGroupRadio;

// import React, { Component } from "react";
// import InputRadio from "./InputRadio";


// class InputGroupRadio extends Component {
//     constructor() {
//       super();
//       this.state = {
//         name: "React"
//       };
//       this.onChangeValue = this.onChangeValue.bind(this);
//     }
  
//     onChangeValue(event) {
//       console.log(event.target.value);
//     }
  
//     render() {

//       const data = this.props.data;
//       const name = this.props.name;
//       const selected = this.props.selected;

//       return (
//         <div onChange={this.onChangeValue}>

//           {data.map((radio, i)=><InputRadio labeltext={radio.label} idRadio={radio.id} valueRadio={radio.value} nameRadio={name} checked={i + 1 ===selected} />)}

//           <InputRadio labeltext="Choix n°1" idRadio="id1" nameRadio="groupe1" valueRadio="value1" />
//           <InputRadio labeltext="Choix n°2" idRadio="id2" nameRadio="groupe1" valueRadio="value2" />
//           <InputRadio labeltext="Choix n°3" idRadio="id3" nameRadio="groupe1" valueRadio="value3" />
//         </div>
//       );
//     }
//   }

// export default InputGroupRadio;