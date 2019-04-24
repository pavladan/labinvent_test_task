const express = require('express');
const bodyParser = require('body-parser');
const WifiItemController = require('./controllers/WifiItemController');
const SettingsController = require('./controllers/SettingsController');

const wifiItemController = new WifiItemController();
const settingsController = new SettingsController();

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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/init',wifiItemController.init);
app.get('/wifilist',wifiItemController.index);
app.get('/getSettings',settingsController.getSettings);

app.listen(5000,()=>{
  console.log('Server are started');
})