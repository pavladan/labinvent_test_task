const initialState = []

export default (state=initialState,action)=>{
  const {type,payload} = action;
  switch (type){
    case 'GET_WIFI_LIST':
      return [
        ...payload
      ];
    default:
      return state;
  }
}