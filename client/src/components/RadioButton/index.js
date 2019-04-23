import React, { Component } from "react";
import './RadioButton.scss'

class RadioButton extends Component{
  
  render(){
    const rnd='i' + Math.round(Math.random() * 500 );
    return(
      <div className="RadioButton">
        <input type="radio" id={rnd} name={this.props.name} defaultChecked={this.props.checked} disabled={this.props.noActive} onChange={this.props.onChangeClick}/>
        <label htmlFor={rnd}>
          {this.props.title}
        </label>
      </div>
    )
  }
}

export default RadioButton;