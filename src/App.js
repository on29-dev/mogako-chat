import React, {Component} from 'react';
import { Route,BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Mainapp from './components/Mainapp';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route path="/chatlist" component={Mainapp}/>
      </BrowserRouter>
    );
  }
}

export default App;
