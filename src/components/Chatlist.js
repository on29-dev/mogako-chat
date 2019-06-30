import React, {Component} from 'react';
import '../style/mgkmap.css';

class Chatlist extends Component {
  render() {
    return (
      <section id="chat" class="chat aside">
        <h1 class="hidden">채팅방리스트</h1>
        <ul id="chatList" class="chat-list">
            <li>
                <h2 class="chat-item-title">채팅방1</h2><span class="chat-item-people">5</span>
                <p class="chat-item-message">최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.</p>
                <time class="chat-item-time">오후 3:51</time>
            </li>
            <li>
                <h2 class="chat-item-title">채팅방2</h2><span class="chat-item-people">5</span>
                <p class="chat-item-message">최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.</p>
                <time class="chat-item-time">오후 3:51</time>
            </li>
            <li>
                <h2 class="chat-item-title">채팅방3</h2><span class="chat-item-people">5</span>
                <p class="chat-item-message">최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.</p>
                <time class="chat-item-time">오후 3:51</time>
            </li>
            <li>
                <h2 class="chat-item-title">채팅방4</h2><span class="chat-item-people">5</span>
                <p class="chat-item-message">최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.최근 메시지 입니다.</p>
                <time class="chat-item-time">오후 3:51</time>
            </li>
        </ul>
        <button id="chatHide" class="chat-hide"><span class="hidden">챗팅리스트 숨기기</span></button>
    </section>
    );
  }
}

export default Chatlist;
