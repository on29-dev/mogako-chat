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
        <Route exact path="/" component={Login}/>
        <PrivateRoute path="/chatlist" component={Mainapp}/>
        <PrivateRoute path="/chatroom" component={Chatroom}/>
      </BrowserRouter>
    );
  }
}

const isAuth = {
  isAuthenticated: true,
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

export default App;
