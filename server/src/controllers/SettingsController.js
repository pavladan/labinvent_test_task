const Settings = require('../models/Settings');

Settings.find().then(e=>{
  if (e.length === 0 ){
    const initialState ={
      buttons:{
        ethernet_ip_auto:true,
        ethernet_dns_auto:true,
        wifi_ip_auto:true,
        wifi_dns_auto:true,
        enableWifi:false,
        enableWirelessSecurity:false
      }
    }
    const settings = new Settings(initialState);
    settings.save();
  }
});

class SettingsController{
  getSettings(req,res){
    Settings.find().then((items)=>{
      res.json(items)
    }).catch(err=>{
      res.send(err);
      console.log(err);
    })
  }
  setSettings(req,res){
    Settings.updateOne(req.body).then(()=>res.json({status:'updated'})).catch(err=>res.send(err));
  }
}

module.exports = SettingsController;