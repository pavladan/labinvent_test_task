import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {RadioButton,InputField,CheckButton} from '../../components/'
import {SelectInput} from '../'
import {Api} from '../../utils/api'
import actions from '../actions'
import './Settings.scss'

class Settings extends Component {
  componentWillMount(){
    Api.getWifiList().then(({data})=>{
      this.props.updateWifiList(data);
    }).catch(err=>{
      alert(err);
    })
    Api.getSettings().then(({data})=>{
      data.length!==0 && this.props.updateCheck(data[0].buttons);
      
      const info=data[0].info;
      if(info !==undefined){
        document.getElementById('ethernet_ipBlock_ip').value=info.ethernet.ipBlock.ip;
        document.getElementById('ethernet_ipBlock_mask').value=info.ethernet.ipBlock.mask;
        document.getElementById('ethernet_ipBlock_gateway').value=info.ethernet.ipBlock.gateway;
        document.getElementById('ethernet_dns_preferred').value=info.ethernet.dns.preferred;
        document.getElementById('ethernet_dns_alternative').value=info.ethernet.dns.alternative;
        if (info.wireless.networkName === '') document.getElementById('wireless_networkName').innerHTML='<p class="placeholder">Please select</p>';
        else  document.getElementById('wireless_networkName').innerHTML=info.wireless.networkName;
        document.getElementById('wireless_securityKey').value=info.wireless.securityKey;
        document.getElementById('wireless_ipBlock_ip').value=info.wireless.ipBlock.ip;
        document.getElementById('wireless_ipBlock_mask').value=info.wireless.ipBlock.mask;
        document.getElementById('wireless_ipBlock_gateway').value=info.wireless.ipBlock.gateway;
        document.getElementById('wireless_dns_preferred').value=info.wireless.dns.preferred;
        document.getElementById('wireless_dns_alternative').value=info.wireless.dns.alternative;
      }      
    }).catch(err=>{
      alert(err);
    })
  }

  onClickSave=(e)=>{
    e.preventDefault();
    const inputData={
      'ethernet':{
        'ipBlock':{
          'ip':'',
          'mask':'',
          'gateway':''
        },
        'dns':{
          'preferred':'',
          'alternative':''
        }
      },
      'wireless':{
        'networkName':'',
        'securityKey':'',
        'ipBlock':{
          'ip':'',
          'mask':'',
          'gateway':''
        },
        'dns':{
          'preferred':'',
          'alternative':''
        }
      }
    };

    const checkInput= (dom)=>{
      let buf=document.getElementById(dom);
      if(buf.classList.contains('required') && buf.value === '') {
        buf.classList.add('error');
        return false;
      } else { buf.classList.remove('error'); }
      return buf.value;
    }

    if(!this.props.check.ethernet_ip_auto){
      inputData.ethernet.ipBlock.ip=checkInput('ethernet_ipBlock_ip');
      inputData.ethernet.ipBlock.mask=checkInput('ethernet_ipBlock_mask');
      inputData.ethernet.ipBlock.gateway=checkInput('ethernet_ipBlock_gateway');
    }
    if(!this.props.check.ethernet_dns_auto){
      inputData.ethernet.dns.preferred=checkInput('ethernet_dns_preferred');
      inputData.ethernet.dns.alternative=checkInput('ethernet_dns_alternative');
    }
    if (this.props.check.enableWifi){
      let buf=document.getElementById('wireless_networkName');
      if(buf.classList.contains('required') && buf.innerText === 'Please select') {
        buf.classList.add('error');
        inputData.wireless.networkName=false;
      } else { 
        inputData.wireless.networkName=buf.innerText;
        buf.classList.remove('error'); 
      }
      if (this.props.check.enableWirelessSecurity){
        inputData.wireless.securityKey=checkInput('wireless_securityKey');
      }
      if(!this.props.check.wifi_ip_auto){
        inputData.wireless.ipBlock.ip=checkInput('wireless_ipBlock_ip');
        inputData.wireless.ipBlock.mask=checkInput('wireless_ipBlock_mask');
        inputData.wireless.ipBlock.gateway=checkInput('wireless_ipBlock_gateway');
      }
      if(!this.props.check.wifi_dns_auto){
        inputData.wireless.dns.preferred=checkInput('wireless_dns_preferred');
        inputData.wireless.dns.alternative=checkInput('wireless_dns_alternative');
      }
    }
    function getFiniteValue(obj) {
      let res=true;
      getProp(obj);
      function getProp(o) {
          for(var prop in o) {
              if(typeof(o[prop]) === 'object') {
                  getProp(o[prop]);
              } else {
                  for (const key in o) {
                    if (o.hasOwnProperty(key)) {
                      if (o[key]===false ) res=false;
                    }
                  }
              }
          }
      }
      return res;
    }
  
    if(getFiniteValue(inputData) === false) return;
    
    Api.setSettings({info:inputData ,buttons:this.props.check}).then(data=>{
      this.props.history.push("/");
    }).catch(err=>{
      alert(err);
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
          <InputField title="IP address:" id="ethernet_ipBlock_ip" mandatory active={!ethernet_ip_auto}/>
          <InputField title="Subnet Mask:" id="ethernet_ipBlock_mask" mandatory active={!ethernet_ip_auto}/>
          <InputField title="Default Gateway:" id="ethernet_ipBlock_gateway" active={!ethernet_ip_auto} />

          <RadioButton title='Obtain DNS server automatically' name='DNS' checked={ethernet_dns_auto} onChangeClick={()=>this.props.changeEthernetDns(true)}/>
          <RadioButton title='Use the folowing DNS server:' name='DNS' checked={!ethernet_dns_auto} onChangeClick={()=>this.props.changeEthernetDns(false)}/>
          <InputField title="Preferred DNS sever:" id="ethernet_dns_preferred" mandatory active={!ethernet_dns_auto}/>
          <InputField title="Alternative DNS server:" id="ethernet_dns_alternative" active={!ethernet_dns_auto}/>
      </div>
    )
    const renderWifi=(
      <div>
        <CheckButton title='Enable wifi:' active name='wifi' checked={enableWifi} onChangeClick={()=>this.props.changeWifi(!this.props.check.enableWifi)}/>
        <SelectInput title='Wireless Network Name:' id="wireless_networkName" active={enableWifi} placeholder='Please select' mandatory  wifiList={this.props.wifiList}  />
        <CheckButton title='Enable Wireless Security:' active={enableWifi} name='wifiSecurity' checked={enableWirelessSecurity} onChangeClick={()=>this.props.changeWirelessSecurity(!this.props.check.enableWirelessSecurity)}/>
        <InputField title="Security Key:" id="wireless_securityKey" mandatory active={enableWirelessSecurity && enableWifi} />
        
        <RadioButton title='Obtain an IP address automatically (DHCP/BootP)' name='IPwifi' checked={wifi_ip_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiIp(true)}/>
        <RadioButton title='Use the folowing IP address:' name='IPwifi' checked={!wifi_ip_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiIp(false)}/>
        <InputField title="IP address:" id="wireless_ipBlock_ip" mandatory active={!wifi_ip_auto && enableWifi}  />
        <InputField title="Subnet Mask:" id="wireless_ipBlock_mask" mandatory active={!wifi_ip_auto && enableWifi} />
        <InputField title="Default Gateway:" id="wireless_ipBlock_gateway" active={!wifi_ip_auto && enableWifi} />

        <RadioButton title='Obtain DNS server automatically' name='DNSwifi' checked={wifi_dns_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiDns(true)}/>
        <RadioButton title='Use the folowing DNS server:' name='DNSwifi' checked={!wifi_dns_auto} noActive={!enableWifi} onChangeClick={()=>this.props.changeWifiDns(false)}/>
        <InputField title="Preferred DNS sever:" id="wireless_dns_preferred" mandatory active={!wifi_dns_auto && enableWifi} />
        <InputField title="Alternative DNS server:" id="wireless_dns_alternative" active={!wifi_dns_auto && enableWifi} />
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

export default withRouter(connect(
  (state)=>state,
  actions
)(Settings));