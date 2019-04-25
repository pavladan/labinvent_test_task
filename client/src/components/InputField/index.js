import React, {Component} from 'react'
import './InputField.scss'

class InputField extends Component{

  render(){
    return(
      <div className='InputField'>
        <input type="text" id={this.props.id} className={this.props.mandatory && 'required'} disabled={!this.props.active}  />
        <label className={this.props.active ? '' : 'disable'}>{this.props.title}{this.props.mandatory && <span className="InputField__mandatory">*</span>}</label>
      </div>
    )
  }
}

export default InputField;