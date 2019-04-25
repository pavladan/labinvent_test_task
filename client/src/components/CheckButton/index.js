import React, {Component} from 'react'
import './CheckButton.scss'

class CheckButton extends Component{

  render(){
    const rnd='c' + Math.round(Math.random() * 500 );
    return(
      <div className="CheckButton">
        <input type="checkbox" id={rnd} name={this.props.name} checked={this.props.checked} disabled={!this.props.active} onChange={this.props.onChangeClick}/>
        <label htmlFor={rnd}>
          {this.props.title}
        </label>
      </div>
    )
  }
}

export default CheckButton;