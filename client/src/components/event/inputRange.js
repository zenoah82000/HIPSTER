import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
 
class inputRange extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: { min: 2, max: 10 },
    };
  }
   return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    ); 
}
 
export default inputRange