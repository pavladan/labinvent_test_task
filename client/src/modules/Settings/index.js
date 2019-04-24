import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {RadioButton,InputField,CheckButton} from '../../components/'
import {SelectInput} from '../'
import {postsApi} from '../../utils/api'
import actions from '../actions'
import './Settings.scss'

class Settings extends Component {
  componentWillMount(){
    postsApi.getWifiList().then(({data})=>{
      this.props.updateWifiList(data);
    }).catch(err=>{
      alert(err);
    })
    postsApi.getSettings().then(({data})=>{
      console.log(data);
      
      this.props.updateCheck(data.buttons);
    }).catch(err=>{
      alert(err);
    })
  }
  onClickSave=(e)=>{
    
  }
  render() {    
    const ethernet_ip_auto=this.props.check.ethernet_ip_auto;
    const ethernet_dns_auto=this.props.check.ethernet_dns_auto;
    const enableWifi = this.props.check.enableWifi;
    const enableWirelessSecurity = this.props.check.enableWirelessSecurity;
    const wifi_ip_auto=this.props.check.wifi_ip_auto;
    const wifi_dns_auto=this.props.check.wifi_dns_auto;
    const input_data=this.props.input_data;
    
    const renderEthernet =(
      <div>
          <RadioButton title='Obtain an IP address automatically (DHCP/BootP)' name='IP' checked={ethernet_ip_auto} onChangeClick={()=>this.props.changeEthernetIp(true)}/>
          <RadioButton title='Use the folowing IP address:' name='IP' checked={!ethernet_ip_auto} onChangeClick={()=>this.props.changeEthernetIp(false)}/>
          <InputField title="IP address:" mandatory active={!ethernet_ip_auto} value={input_data.ethernet.ipBlock.ip}/>
          <InputField title="Subnet Mask:" mandatory active={!ethernet_ip_auto} value={input_data.ethernet.ipBlock.mask}/>
          <InputField title="Default Gateway:" active={!ethernet_ip_auto}  value={input_data.ethernet.ipBlock.gateway}/>

          <RadioButton title='Obtain DNS server automatically' name='DNS' checked={ethernet_dns_auto} onChangeClick={()=>this.props.changeEthernetDns(true)}/>
          <RadioButton title='Use the folowing DNS server:' name='DNS' checked={!ethernet_dns_auto} onChangeClick={()=>this.props.changeEthernetDns(false)}/>
          <InputField title="Preferred DNS sever:" mandatory active={!ethernet_dns_auto} value={input_data.ethernet.dns.preferred}/>
          <InputField title="Alternative DNS server:" active={!ethernet_dns_auto}  value={input_data.ethernet.dns.alternative}/>
      </div>
    )
    const renderWifi=(
      <div>
        <CheckButton title='Enable wifi:' active name='wifi' checked={enableWifi} onChangeClick={()=>this.props.changeWifi(!this.props.check.enableWifi)}/>
        <SelectInput title='Wireless Network Name:' active={enableWifi} placeholder='Please select' mandatory  wifiList={this.props.wifiList}  value={input_data.wireless.networkName}/>
        <CheckButton title='Enable Wireless Security:' active={enableWifi} name='wifiSecurity' checked={enableWirelessSecurity} onChangeClick={()=>this.props.changeWirelessSecurity(!this.props.check.enableWirelessSecurity)}/>
        <InputField title="Security Key:" mandatory active={enableWirelessSecurity && enableWifi} value={input_data.wireless.securrityKey}/>
        
        <RadioButton title='Obtain an IP address automatically (DHCP/BootP)' name='IPwifi' checked={wifi_ip_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiIp(true)}/>
        <RadioButton title='Use the folowing IP address:' name='IPwifi' checked={!wifi_ip_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiIp(false)}/>
        <InputField title="IP address:" mandatory active={!wifi_ip_auto && enableWifi}  value={input_data.wireless.ipBlock.ip}/>
        <InputField title="Subnet Mask:" mandatory active={!wifi_ip_auto && enableWifi}  value={input_data.wireless.ipBlock.mask}/>
        <InputField title="Default Gateway:" active={!wifi_ip_auto && enableWifi}  value={input_data.wireless.ipBlock.gateway}/>

        <RadioButton title='Obtain DNS server automatically' name='DNSwifi' checked={wifi_dns_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiDns(true)}/>
        <RadioButton title='Use the folowing DNS server:' name='DNSwifi' checked={!wifi_dns_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiDns(false)}/>
        <InputField title="Preferred DNS sever:" mandatory active={!wifi_dns_auto && enableWifi}   value={input_data.wireless.preferred}/>
        <InputField title="Alternative DNS server:" active={!wifi_dns_auto && enableWifi}   value={input_data.wireless.alternative}/>
      </div>
    )
  
    return (
      <div className="Settings">
        <form>
          <div className="options">
            <div className="options__col">
              <h2>Ethernet Settings</h2>
                {renderEthernet}
            </div>
            <div className="options__col">
              <h2>Wireless Settings</h2>
                {renderWifi}
            </div>
          </div>
          <div className="buttons">
            <button className="btn btn-full" onClick={this.onClickSave}>Save</button>
            <Link to='/'><button className="btn btn-empty" onClick={this.props.resetCheckboxes}>Cancel</button></Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  (state)=>state,
  actions
)(Settings);