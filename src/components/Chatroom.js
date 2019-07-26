import React, {Component} from 'react';
// import SockJsClient from 'react-stomp';
import '../style/chatroom.css';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state={
      chatroomId:this.props.location.state.chatRoomId,
      memberId:this.props.memberId,
      chatLog: [{time:'오후 02:13',msg:'안녕하세요'}, {time:'오후 02:13',msg:'인디아흔 아틸라티'}, {time:'오후 02:14',msg:'와신상담쓰'}]
    }
  }
  sendMessage = (msg) => {
    console.log('[메세지] 전송', msg)
    this.clientRef.sendMessage(`/chatmessage/${this.state.chatroomId}`,JSON.stringify({
      "memberId":this.state.memberId,
      "chatroomId":this.state.chatroomId,
      "chatmessage":msg
    }));
    console.log(this.clientRef);
  }
  render() {
    return (
      <div>
        {/* {this.state.chatroomId}번 채팅방 */}
        <form action={`/chatroom/${this.state.chatroomId}`} method="post"
          onSubmit={e=>{
              e.preventDefault();
              this.sendMessage(e.target.chatMsg.value);
          }}
        >
        <section id="chat-room" className="main chat-room">
            <div id="chat-content" className="chat-content">
                <div className="chat-date">2019년 6월 7일(금요일)</div>
                <div className="profile-image" tabIndex="-1"></div>
                <span className="profile-name">작성자</span><time className="profile-time">오후 3:14</time>
                <div className="chat-message">윈 10 쓰시는 분들 중에.</div>
            </div>
            <input type="text" id="inputChat" className="input-chat" name="chatMsg"/>
            <input type="submit" className="hidden"/>
        </section>

        </form>
        {/* <SockJsClient 
          url={`${process.env.REACT_APP_SERVER_SOCKET_ID}/mogako-websocket`}
          topics={[`/chatroom/${this.state.chatroomId}`]}
          onMessage={(msg) => { console.log('구독 중인 채팅방에서 타인이 보내는 메시지',msg); }}
          ref={ (client) => { this.clientRef = client }}
        /> */}
      </div>
    );
  }
}

export default Chatroom;
