const initialState ={}

export default (state=initialState,action)=>{
  const {type,payload} = action;
  switch (type){
    case 'ETHERNET_IP_AUTO':
      return {
        ...state,
        ethernet_ip_auto: payload
      };
    case 'ETHERNET_DNS_AUTO':
      return {
        ...state,
        ethernet_dns_auto: payload
      };
    case 'WIFI_IP_AUTO':
      return {
        ...state,
        wifi_ip_auto: payload
      };
    case 'WIFI_DNS_AUTO':
      return {
        ...state,
        wifi_dns_auto: payload
      };
    case 'CHANGE_WIFI':
      return {
        ...state,
        enableWifi: payload
      };
    case 'CHANGE_WIRELESS_SECURITY':
      return {
        ...state,
        enableWirelessSecurity: payload
      };
    case 'UPDATE_ALL':
      return{
        ...payload 
      }
    case 'RESET':
      return{
        ...initialState
      }
    default:
      return state;
  }
}