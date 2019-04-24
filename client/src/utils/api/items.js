import { axios } from '../../core';

export default {
  getWifiList: () => axios.get('/wifilist'),
  getSettings: () => axios.get('/getSettings'),
  // postSettungs: () => axios.post('/settings'),
};