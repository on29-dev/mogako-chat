import React, {Component} from 'react';
import '../style/mgkmap.css';

class Chatlist extends Component {
  constructor(props){
    super(props);
    this.state={
      chatList:[
        {id:1,title:'채팅방1',memberNum:5,recentMsg:'최근메시지1최근메시지1최근메시지1최근메시지1최근메시지1최근메시지1최근메시지1',recentTime:'오후 3:15',},
        {id:2,title:'채팅방2',memberNum:32,recentMsg:'최근메시지2',recentTime:'오후 4:15',},
        {id:3,title:'채팅방3',memberNum:1,recentMsg:'최근메시지3',recentTime:'오후 12:12',},
      ]
    }
  }

  chatRoom(){
    let chatlist=[];
    const chatrooms = Array.from(this.state.chatList);
    for (let item of chatrooms){
      chatlist.push(
        <li key={item.id}>
          <h2 className="chat-item-title">{item.title}</h2><span className="chat-item-people">{item.memberNum}</span>
          <div className="chat-item-message">{item.recentMsg}</div>
          <time className="chat-item-time">{item.recentTime}</time>
        </li>
      )
    }
    return chatlist;
  }

  render() {
    return (
      <section id="chat" className="chat aside">
        <h1 className="hidden">채팅방리스트</h1>
        <ul id="chatList" className="chat-list">
          {this.chatRoom()}
        </ul>
        <button id="chatHide" className="chat-hide"><span className="hidden">챗팅리스트 숨기기</span></button>
    </section>
    );
  }
}

export default Chatlist;
