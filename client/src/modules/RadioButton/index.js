import React, { Component } from "react";
import './RadioButton.scss'

class RadioButton extends Component{
  
  render(){
    return(
      <div className="RadioButton">
        <label>
        <input type="radio" name={this.props.name} defaultChecked={this.props.checked} onChange={this.props.onChangeClick}/>
          {this.props.title}
        </label>
      </div>
    )
  }
}

export default RadioButton;