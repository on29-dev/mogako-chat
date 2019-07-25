import React, { Component } from 'react';
import '../style/locationAuth.css'

class LocationAuth extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return (
      <section className="modal-block">
        <div className="location-auth modal-window">
          재인증시 기존의 인증되었던 위치의 채팅방에서 나가질 수 있습니다. 그래도 현위치로 재인증하시겠습니까?
          <button>재인증</button>
        </div>
      </section>
    )
  }
}

export default LocationAuth;