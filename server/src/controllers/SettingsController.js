const Settings = require('../models/Settings');

class SettingsController{
  getSettings(req,res){
    Settings.find().then((err,items)=>{
      if(err){
        res.send(err);
      }
      res.json(items)
    })
  }
}

module.exports = SettingsController;