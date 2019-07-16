import React, {Component} from 'react';
import SockJsClient from 'react-stomp';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state={
      chatroomId:this.props.location.state.chatId,
      memberId:this.props.memberId,
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
        {this.state.chatroomId}번 채팅방
        <form action={`/chatroom/${this.state.chatroomId}`} method="post"
          onSubmit={e=>{
              e.preventDefault();
              this.sendMessage(e.target.chatMsg.value);
          }}
        >
          <input type="text" name="chatMsg"/>
          <input type="submit"/>
        </form>
        <SockJsClient 
          url={`${process.env.REACT_APP_SERVER_SOCKET_ID}/mogako-websocket`}
          topics={[`/chatroom/${this.state.chatroomId}`]}
          onMessage={(msg) => { console.log('구독 중인 채팅방에서 타인이 보내는 메시지',msg); }}
          ref={ (client) => { this.clientRef = client }}
        />
      </div>
    );
  }
}

export default Chatroom;
