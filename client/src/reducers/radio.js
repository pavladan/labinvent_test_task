const initialState ={
  ethernet_ip_auto:true,
  ethernet_dns_auto:true,
  wifi_ip_auto:true,
  wifi_dns_auto:true
}

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
    default:
      return state;
  }
}