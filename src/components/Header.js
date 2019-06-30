import React, {Component} from 'react';
import '../style/chatmap.css';

class Header extends Component {
  render() {
    return (
      <header id="gnb" class="gnb">
          <h1 class="logo">모각코 맵(채팅)</h1>
          <nav class="navigator">
            <ul>
              <li>마이페이지</li>
              <li>로그아웃</li>
            </ul>
          </nav>
      </header>
    );
  }
}

export default Header;
