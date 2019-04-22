import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {RadioButton,InputField} from '../'
import './Settings.scss'

class Settings extends Component {
   renderEthernetIp = (e)=>{
    return (
      <div>
          <RadioButton title='Obtain an IP address automatically (DHCP/BootP)' name='IP' checked={e} onChangeClick={()=>this.props.changeEthernetIp(true)}/>
          <RadioButton title='Use the folowing IP address:' name='IP' checked={!e} onChangeClick={()=>this.props.changeEthernetIp(false)}/>
          <InputField title="IP address:" mandatory active={!e}/>
          <InputField title="Subnet Mask:" mandatory active={!e}/>
          <InputField title="Default Gateway:" active={!e}/>
      </div>
    )
  }
  render() {
    return (
      <div className="Settings">
        <div className="options">
          <div className="options__col">
            <h2>Ethernet Settings</h2>
            <form>
              {this.renderEthernetIp(this.props.ethernet_ip_auto)}
            </form>
          </div>
          <div className="options__col">
            <h2>Wireless Settings</h2>
            <form>
              
            </form>
          </div>
        </div>
        <div className="buttons">
          <button className="btn btn-full">Save</button>
          <Link to='/'><button className="btn btn-empty">Cancel</button></Link>
        </div>
      </div>
    );
  }
}

export default connect(
  ({radio})=>radio,
  dispatch=>({
    changeEthernetIp:(is)=>{
      dispatch({type:'ETHERNET_IP_AUTO',payload:is})
    }
  })
)(Settings);