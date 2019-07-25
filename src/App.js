import React, {Component} from 'react';
import { Route,BrowserRouter,Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Auth from './components/Auth';
import PrivateModal from './components/PrivateModal';
import Mainapp from './components/Mainapp';
import Chatroom from './components/Chatroom';
import Mypage from './components/Mypage';
import ModalPortal from './ModalPortal';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      modal:false,
      memberInfo:{
        email:'abc@def.ghi',
        username:'mockUser',
        userSkill:['JavaScript'],
        imgUrl:'https://i.stack.imgur.com/34AD2.jpg',
        idToken:'123123123idTkn',
        accessToken:'123123123acsTkn'
      },
      skills: ["Python","Java","JavaScript","HTML","CSS","C#","PHP","C/C++","R","Objective-C","Swift","SQL","NoSQL","Matlab","TypeScript","Ruby","VBA","Kotlin","Go","Scala","Visual Basic","Perl","Rust","Lua", "없음"]
    }
  }
  handleOpenModal=_=>{
    this.setState({
      modal: true
    });
  };
  handleCloseModal=_=>{
    this.setState({
      modal: false
    });
  };
  onSubmit=(...data)=>{
    const SIGN_UP_URL='';
    console.log('Submit', ...data);
    axios({method:'post', url:SIGN_UP_URL, data:{...data}})
      .then(function (res) {
        console.log('[회원정보 수정] 완료')
        console.log(res);
        this.handleCloseModal();
      })
      .catch(function (err) {
        console.log('[회원정보 수정] 실패')
        console.log(err);
      });
  }
  render() {
    return (
      <BrowserRouter>
        <Header onClick={this.handleOpenModal}></Header>
        <Route exact path="/" component={Login}/>
        <PrivateRoute path="/chatlist" component={Mainapp}/>
        <PrivateRoute path="/chatroom" component={Chatroom} {...this.state.memberInfo}/>
        {this.state.modal && (
          <ModalPortal>
            <PrivateModal path="/mypage" component={Mypage} {...this.state.memberInfo} skills={this.state.skills}
            onClose={this.handleCloseModal}
            onSubmit={this.onSubmit}
            />
          </ModalPortal>
        )}
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ? <Component {...props} {...rest}/>
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
        }} />
  )} />
)


const Header=({onClick})=>{
  if(Auth.isAuthenticated === true){
    return (<header id="gnb" className="gnb">
        <h1 className="logo">모각코 맵(채팅)</h1>
        <nav className="navigator">
          <ul>
            <li onClick={onClick} style={{cursor:'pointer'}} >마이페이지</li>
            <li>로그아웃</li>
          </ul>
        </nav>
    </header>)
    } else {return null}
}

export default App;
