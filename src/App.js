import React, {Component} from 'react';
import { Route,BrowserRouter,Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Mainapp from './components/Mainapp';
import Chatroom from './components/Chatroom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header></Header>
        <Route exact path="/" component={Login}/>
        <PrivateRoute path="/chatlist" component={Mainapp}/>
        <PrivateRoute path="/chatroom" component={Chatroom}/>
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
      ? <Component {...props} />
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
            <li>마이페이지</li>
            <li>로그아웃</li>
          </ul>
        </nav>
    </header>)
    } else {return null}
}

export default App;
