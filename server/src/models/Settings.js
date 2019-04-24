const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const SettingsSchema = new Schema(
  {
    'info':{
      'ethernet':{
        'ipBlock':{
          'ip':String,
          'mask':String,
          'gateway':String
        },
        'dns':{
          'preferred':String,
          'alternative':String
        }
      },
      'wireless':{
        'networkName':String,
        'securrityKey':String,
        'ipBlock':{
          'ip':String,
          'mask':String,
          'gateway':String
        },
        'dns':{
          'preferred':String,
          'alternative':String
        }
      }
    },
    'buttons':{
      ethernet_ip_auto:Boolean,
      ethernet_dns_auto:Boolean,
      wifi_ip_auto:Boolean,
      wifi_dns_auto:Boolean,
      enableWifi:Boolean,
      enableWirelessSecurity:Boolean
    }
  }
)
module.exports = mongoose.model ('Settings',SettingsSchema);
