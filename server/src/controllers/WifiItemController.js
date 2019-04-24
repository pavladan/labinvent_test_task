const WifiItem = require('../models/WifiItem');

class WifiItemController{
  index(req,res){
    WifiItem.find().then((err,items)=>{
      if(err){
        res.send(err);
      }
      res.json(items)
    })
  }
  init(req,res){
    WifiItem.remove();
    req.forEach(e=>{
      const post = new WifiItem(e)
      post.save().then(()=>{
        res.send({status:'ok'});
    });
    })
    
  }
}

module.exports = WifiItemController;