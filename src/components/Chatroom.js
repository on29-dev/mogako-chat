import React, {Component} from 'react';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state={
      chatroomId:this.props.location.state.chatId,
    }
  }
  
  render() {
    return (
      <div>
        {this.state.chatroomId}번 채팅방
      </div>
    );
  }
}

export default Chatroom;