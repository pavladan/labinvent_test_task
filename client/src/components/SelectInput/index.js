import React, {Component} from 'react'
import './SelectInput.scss'

class SelectInput extends Component{
  render(){
    const wifiList = this.props.wifiList.slice();
    const renderWifiList = wifiList.filter(e=>e.favorite).sort((a,b)=>b.strength-a.strength).concat(wifiList.filter(e=>!e.favorite).sort((a,b)=>b.strength-a.strength)).map((e)=>(
      <li key={e._id}>{e.name}</li>
    ))
    const classNameSelect=this.props.active?'SelectInput': 'SelectInput disabled';
    return(
      <div className={classNameSelect}>
        <div className="select" onClick={(e)=>{this.props.active && e.currentTarget.classList.toggle('open')}}>
          <div className="select__head" > 
            {this.props.placeholder}
          </div>
          <ul>
          {renderWifiList}
          </ul>
        </div>
        <label className={this.props.active ? '' : 'disable'}>{this.props.title}{this.props.mandatory && <span className="InputField__mandatory">*</span>}</label>
      </div>
    )
  }
}

export default SelectInput;