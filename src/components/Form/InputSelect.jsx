import React from 'react';

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

      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Votre type de support de communication :
            <select value={this.state.value} onChange={this.handleChange}>

            <option>--Type de support</option>
            {data.map((select)=><option value={select.id}>{select.value}</option>)}
            
            </select>
          </label>
        </form>
      );
    }
}

export default InputSelect;