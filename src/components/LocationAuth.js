import React, { Component } from 'react';
import '../style/locationAuth.css';
import '../style/modal.css';

class LocationAuth extends Component {
  render(){
    return (
      <section className="modal-block">
        <div className="location-auth modal-window">
        <h2 className="modal-title">현 위치 인증</h2>
          <div className="modal-content">
            <div className="modal-content-comment">{this.authComment().infoComment}</div>
            <button className="btn-submit"
              onClick={this.props.getCurrentPosition}
            >{this.authComment().btnComment}</button>
          </div>
            {!!this.props.isLocaAuth
              ? <i className="fas fa-times btn-modal-close" onClick={this.props.onClose}></i>
              : null
            }
        </div>
      </section>
    )
  }
  
  authComment=_=>{
    let comments;
    if(!!this.props.isLocaAuth){
        comments = {
            infoComment:`재인증시 기존의 인증되었던 위치의 일부 채팅방에서 나가질 수 있습니다. 그래도 현위치로 재인증하시겠습니까?`, 
            btnComment: `재인증하기`}
    } else {
        comments = {
            infoComment:`모각코 맵을 사용하시려면 현재 위치를 인증하셔야 합니다. 인증하기 버튼을 눌러 현재 위치의 채팅방의 사람들과 소통하세요!`,
            btnComment:'인증하기'}
    }
    return comments;
  }
}

export default LocationAuth;