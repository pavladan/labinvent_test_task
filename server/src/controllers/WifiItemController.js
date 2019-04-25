const WifiItem = require('../models/WifiItem');

class WifiItemController{
  index(req,res){
    WifiItem.find().then((items)=>{
      res.json(items)
    }).catch(err=>{
      console.log(err);
      throw err;
    })
  }
}

module.exports = WifiItemController;