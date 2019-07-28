import React, { Component } from 'react';
import '../style/locationAuth.css'

class LocationAuth extends Component {
  render(){
    console.log(this.props)
    return (
      <section className="modal-block">
        <div className="location-auth modal-window">
          {this.props.comments.infoComment}
          <button
            onClick={this.props.getCurrentPosition}
          >{this.props.comments.btnComment}</button>
        </div>
      </section>
    )
  }
  
}

export default LocationAuth;