import React, {Component} from 'react'
import './SelectInput.scss'

class SelectInput extends Component{

  render(){
    return(
      <div className='SelectInput'>
        <label className={this.props.active ? '' : 'disable'}>{this.props.title}{this.props.mandatory && <span className="InputField__mandatory">*</span>}</label>
        <select disabled={!this.props.active} placeholder={this.props.placeholder}> 
          <option ></option>
        </select>
      </div>
    )
  }
}

export default SelectInput;