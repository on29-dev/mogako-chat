import React, {Component} from 'react';
import { Route,BrowserRouter,Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
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
        imgUrl:'https://i.stack.imgur.com/34AD2.jpg',
        idToken:'123123123idTkn',
        accessToken:'123123123acsTkn'
      },
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
            <PrivateModal path="/mypage" component={Mypage} {...this.state.memberInfo}
            onClose={this.handleCloseModal}
            onSubmit={this.onSubmit}
            />
          </ModalPortal>
        )}
      </BrowserRouter>
    );
  }
}

const isAuth = {
  isAuthenticated:true,
  login(cb) {
    this.isAuthenticated = true
    // setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    // setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuth.isAuthenticated === true
      ? <Component {...props} {...rest}/>
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
        }} />
  )} />
)

const PrivateModal = ({ component: Component, ...rest }) => (
  isAuth.isAuthenticated === true
    ? <Component {...rest}/>
    : <Redirect to={'/'} />
)

const Header=({onClick})=>{
  if(isAuth.isAuthenticated === true){
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
