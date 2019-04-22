const initialState = []

export default (state=initialState,action)=>{
  const {type,payload} = action;
  switch (type){
    case 'ETHERNET_IP_AUTO':
      return {
        ...state,
        ethernet_ip_auto: payload
      };
    default:
      return state;
  }
}