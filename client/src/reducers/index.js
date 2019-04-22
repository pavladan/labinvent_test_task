import {combineReducers} from 'redux'
import check from './check'
import wifiList from './wifiList'

export default combineReducers({
  check,
  wifiList
})