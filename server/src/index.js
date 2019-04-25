const express = require('express');
const bodyParser = require('body-parser');
const WifiItem = require('./models/WifiItem');
const WifiItemController = require('./controllers/WifiItemController');
const SettingsController = require('./controllers/SettingsController');

const wifiItemController = new WifiItemController();
const settingsController = new SettingsController();
const mock = require('./resources/mock.json')

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/labinvent', {useNewUrlParser: true})
  .then(()=>console.log('MongoDB connect'))
  .catch(err=>console.error(err));

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const mockLoading = ()=>{
  mock.forEach(e=>{
    const mockItem = new WifiItem(e)
    mockItem.save(err=>{
        if(err) console.log(err);
    })
  });
}
WifiItem.find().then((item)=>item.length===0 && mockLoading()).catch(err=>console.log(err));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/wifilist',wifiItemController.index);
app.get('/getSettings',settingsController.getSettings);
app.post('/setSettings',settingsController.setSettings);

app.listen(5000,()=>{
  console.log('Server are started');
})
