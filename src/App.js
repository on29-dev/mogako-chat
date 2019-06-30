import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Mgkmap from './components/Mgkmap';
import Chatlist from './components/Chatlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Mgkmap></Mgkmap>
        <Chatlist></Chatlist>
      </div>
    );
  }
}

export default App;
