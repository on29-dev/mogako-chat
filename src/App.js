import React, {Component} from 'react';
import { Route,BrowserRouter,Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Mainapp from './components/Mainapp';
import Chatroom from './components/Chatroom';
import Mypage from './components/Mypage';
import ModalPortal from './ModalPortal';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      modal:false,
      memberInfo:{
        email:'abc@def.ghi',
        username:'mockUser',
        imgUrl:'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=103&_nc_oc=AQkBIqz97vfqChDxlee-nU0_DHI_5UkaVftQxuqBvxMC9BgEEE-p173mxlknp0gN8uw&_nc_ht=scontent-icn1-1.xx&oh=b6c0fda9d1a78a65f19992646ca0f8b1&oe=5DBA8EE9',
        idToken:'123123123idTkn',
        accessToken:'123123123acsTkn'
      },
    }
  }
  handleOpenModal=_=>{
    console.log('handleOpenModal')
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
    console.log('Submit', ...data)
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
