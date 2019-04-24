const initialState = {
  'ethernet':{
    'ipBlock':{
      'ip':'12553',
      'mask':'',
      'gateway':''
    },
    'dns':{
      'preferred':'',
      'alternative':''
    }
  },
  'wireless':{
    'networkName':'',
    'securrityKey':'',
    'ipBlock':{
      'ip':'',
      'mask':'',
      'gateway':''
    },
    'dns':{
      'preferred':'',
      'alternative':''
    }
  }
}

export default (state=initialState,action)=>{
  const {type,payload} = action;
  switch (type){
    case 'SET_INPUT_DATA':
      return {
        ...payload
      };
    case 'RESET':
      return{
        ...initialState
      }
    default:
      return state;
  }
}