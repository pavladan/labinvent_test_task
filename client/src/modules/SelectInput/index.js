import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Api} from '../../utils/api'
import actions from '../actions'
import './SelectInput.scss'
import { ReactComponent as Logo } from '../../img/refresh_icon.svg';

class SelectInput extends Component{
  onClickUpdate=(e)=>{
    const svg=e.currentTarget;
    svg.classList.add('load');
    console.log(svg);
    Api.getWifiList().then(({data})=>{
      this.props.updateWifiList(data);
      svg.classList.remove('load');
    })
  }
  render(){
    const wifiList = this.props.wifiList.slice();
    const renderWifiList = wifiList.filter(e=>e.favorite).sort((a,b)=>b.strength-a.strength).concat(wifiList.filter(e=>!e.favorite).sort((a,b)=>b.strength-a.strength)).map((e)=>(
      <li key={e._id} onClick={(e)=>{document.querySelector('.select__head').innerHTML=e.currentTarget.innerText}}>{e.name}</li>
    ))
    const classNameSelect=this.props.active?'SelectInput': 'SelectInput disabled';
    return(
      <div className={classNameSelect}>
        <Logo className="update_svg" onClick={(e)=>this.onClickUpdate(e)}></Logo>
        <div className="select" onClick={(e)=>{this.props.active && e.currentTarget.classList.toggle('open')}}>
          <div className={this.props.mandatory ? 'select__head required' : "select__head"} id={this.props.id}> 
            <p className='placeholder'> {this.props.placeholder}</p>
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

export default connect(
  (state)=>state,
  actions
)(SelectInput);