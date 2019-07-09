import React, {Component} from 'react';
import { Route,BrowserRouter,Redirect,Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Mainapp from './components/Mainapp';
import Chatroom from './components/Chatroom';
import Mypage from './components/Mypage';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      memberInfo:{
        email:'abc@def.ghi',
        username:'mockUser',
        imgUrl:'mockImage',
        idToken:'123123123idTkn',
        accessToken:'123123123acsTkn'
      },
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Header></Header>
        <Route exact path="/" component={Login}/>
        <PrivateRoute path="/chatlist" component={Mainapp}/>
        <PrivateRoute path="/chatroom" component={Chatroom} {...this.state.memberInfo}/>
        <PrivateRoute path="/mypage" component={Mypage} {...this.state.memberInfo}/>
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

const Header=_=>{
  if(isAuth.isAuthenticated === true){
    return (<header id="gnb" className="gnb">
        <h1 className="logo">모각코 맵(채팅)</h1>
        <nav className="navigator">
          <ul>
            <li><Link to="/mypage">마이페이지</Link></li>
            <li>로그아웃</li>
          </ul>
        </nav>
    </header>)
    } else {return null}
}

export default App;
