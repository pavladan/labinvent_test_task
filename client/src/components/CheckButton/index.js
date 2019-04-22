import React, {Component} from 'react'
import './CheckButton.scss'

class CheckButton extends Component{

  render(){
    return(
      <div className="CheckButton">
        <label>
        <input type="checkbox" name={this.props.name} defaultChecked={this.props.checked} disabled={!this.props.active} onChange={this.props.onChangeClick}/>
          {this.props.title}
        </label>
      </div>
    )
  }
}

export default CheckButton;