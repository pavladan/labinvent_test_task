import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {RadioButton,InputField,CheckButton,SelectInput} from '../../components/'
import {postsApi} from '../../utils/api'
import actions from '../actions'
import './Settings.scss'

class Settings extends Component {
  componentWillMount(){
    postsApi.get().then(({data})=>{
      this.props.updateWifiList(data);
    })
  }
  render() {    
    const ethernet_ip_auto=this.props.check.ethernet_ip_auto;
    const ethernet_dns_auto=this.props.check.ethernet_dns_auto;
    const enableWifi = this.props.check.enableWifi;
    const enableWirelessSecurity = this.props.check.enableWirelessSecurity;
    const wifi_ip_auto=this.props.check.wifi_ip_auto;
    const wifi_dns_auto=this.props.check.wifi_dns_auto;
    const renderEthernet =(
      <div>
          <RadioButton title='Obtain an IP address automatically (DHCP/BootP)' name='IP' checked={ethernet_ip_auto} onChangeClick={()=>this.props.changeEthernetIp(true)}/>
          <RadioButton title='Use the folowing IP address:' name='IP' checked={!ethernet_ip_auto} onChangeClick={()=>this.props.changeEthernetIp(false)}/>
          <InputField title="IP address:" mandatory active={!ethernet_ip_auto}/>
          <InputField title="Subnet Mask:" mandatory active={!ethernet_ip_auto}/>
          <InputField title="Default Gateway:" active={!ethernet_ip_auto}/>

          <RadioButton title='Obtain DNS server automatically' name='DNS' checked={ethernet_dns_auto} onChangeClick={()=>this.props.changeEthernetDns(true)}/>
          <RadioButton title='Use the folowing DNS server:' name='DNS' checked={!ethernet_dns_auto} onChangeClick={()=>this.props.changeEthernetDns(false)}/>
          <InputField title="Preferred DNS sever:" mandatory active={!ethernet_dns_auto}/>
          <InputField title="Alternative DNS server:" active={!ethernet_dns_auto}/>
      </div>
    )
    const renderWifi=(
      <div>
        <CheckButton title='Enable wifi:' active name='wifi' checked={enableWifi} onChangeClick={()=>this.props.changeWifi(!this.props.check.enableWifi)}/>
        <SelectInput title='Wireless Network Name:' active={enableWifi} placeholder='Please select' mandatory  wifiList={this.props.wifiList}/>
        <CheckButton title='Enable Wireless Security:' active={enableWifi} name='wifiSecurity' checked={enableWirelessSecurity} onChangeClick={()=>this.props.changeWirelessSecurity(!this.props.check.enableWirelessSecurity)}/>
        <InputField title="Security Key:" mandatory active={enableWirelessSecurity && enableWifi}/>
        
        <RadioButton title='Obtain an IP address automatically (DHCP/BootP)' name='IPwifi' checked={wifi_ip_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiIp(true)}/>
        <RadioButton title='Use the folowing IP address:' name='IPwifi' checked={!wifi_ip_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiIp(false)}/>
        <InputField title="IP address:" mandatory active={!wifi_ip_auto && enableWifi}/>
        <InputField title="Subnet Mask:" mandatory active={!wifi_ip_auto && enableWifi}/>
        <InputField title="Default Gateway:" active={!wifi_ip_auto && enableWifi}/>

        <RadioButton title='Obtain DNS server automatically' name='DNSwifi' checked={wifi_dns_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiDns(true)}/>
        <RadioButton title='Use the folowing DNS server:' name='DNSwifi' checked={!wifi_dns_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiDns(false)}/>
        <InputField title="Preferred DNS sever:" mandatory active={!wifi_dns_auto && enableWifi}/>
        <InputField title="Alternative DNS server:" active={!wifi_dns_auto && enableWifi}/>
      </div>
    )
  
    return (
      <div className="Settings">
        <div className="options">
          <div className="options__col">
            <h2>Ethernet Settings</h2>
            <form>
              {renderEthernet}
            </form>
          </div>
          <div className="options__col">
            <h2>Wireless Settings</h2>
            <form>
              {renderWifi}
            </form>
          </div>
        </div>
        <div className="buttons">
          <button className="btn btn-full">Save</button>
          <Link to='/'><button className="btn btn-empty" onClick={this.props.resetCheckboxes}>Cancel</button></Link>
        </div>
      </div>
    );
  }
}

export default connect(
  (state)=>state,
  actions
)(Settings);