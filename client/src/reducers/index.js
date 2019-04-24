import {combineReducers} from 'redux'
import check from './check'
import wifiList from './wifiList'
import input_data from './input_data'

export default combineReducers({
  check,
  wifiList,
  input_data
})