const WifiItem = require('../models/WifiItem');
const mock = require('../../../src/resources/mock.json')
console.log(mock);

class WifiItemController{
  index(req,res){
    WifiItem.find().then((err,posts)=>{
      if(err){
        res.send(err);
      }
      res.json(posts)
    })
  }
  init(){
    mock.forEach(e=>{
      const post = new WifiItem(e)
    post.save().then(()=>{
      res.send({status:'ok'});
    });
    })
    
  }
}

module.exports = WifiItemController;