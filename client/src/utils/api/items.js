import { axios } from '../../core';

export default {
  getWifiList: () => axios.get('/wifilist'),
  getSettings: () => axios.get('/getSettings'),
  setSettings: (data) => axios({
    method:'post',
    url:'/setSettings',
    data:data
  })
};