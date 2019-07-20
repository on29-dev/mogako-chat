import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Chatlist extends Component {
  constructor(props){
    super(props);
    this.state={
      chatList:this.props.chatList,
      chatRoomTitle:undefined,
      chatRoomTitleDefault:'다같이 모여서 코딩해요!'
    }
  }
  
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const chatlistActive=[...this.state.chatList].filter(item=>item.isNear===true)
    const chatlistDisable=[...this.state.chatList].filter(item=>item.isNear===false)
    const listItemActive=chatlistActive.map(item=>{
      return (
        <li className="chat-item active" key={item.id}
        onClick={_=>{this.props.history.push({
          pathname: "/chatroom",
          state: {chatRoomId:item.id}})}
        }
        >
          <h2 className="chat-item-title">{item.title}</h2><span className="chat-item-people">{item.memberNum}</span>
          <div className="chat-item-message">{item.recentMsg}</div>
          <time className="chat-item-time">{item.recentTime}</time>
        </li>
      )
    })
    const listItemDisable=chatlistDisable.map(item=>{
      return (
        <li className="chat-item disable" key={item.id}>
          <h2 className="chat-item-title">{item.title}</h2><span className="chat-item-people">{item.memberNum}</span>
          <div className="chat-item-message">{item.recentMsg}</div>
          <time className="chat-item-time">{item.recentTime}</time>
        </li>
      )
    })

    return (
      <section id="chat" className="chat aside">
        <h1 className="hidden">채팅방리스트</h1>
        <ul id="chatList" className="chat-list">
          <li className="chat-item">
            <i className="fas fa-plus-circle"></i>
            채팅방 만들기
            <form action="/chatroom/create" method="POST"
              onSubmit={e=>{
                e.preventDefault();
                const chatRoomTitle = this.state.chatRoomTitle === undefined 
                  ? this.state.chatRoomTitleDefault 
                  : this.state.chatRoomTitle
                this.props.onSubmit(chatRoomTitle);
              }}
            >
              <input type="text" name="chatRoomTitle" id="chatRoomTitle" placeholder="채팅방 이름을 써주세요"
                value={this.state.chatRoomTitle === undefined ? this.state.chatRoomTitleDefault : this.state.chatRoomTitle}
                onChange={e=>{
                  this.inputFormHandler(e)}}
              />
              {/* <input type="submit" className="btn btn-submit" value="수정하기"/> */}
            </form>
          </li>
          {listItemActive}
          {listItemDisable}
        </ul>
        <button id="chatHide" className="chat-hide"><span className="hidden">챗팅리스트 숨기기</span></button>
    </section>
    );
  }
}

export default withRouter(Chatlist);
