import React, {Component} from 'react';
import './App.css';
import Login from './components/Login';
import Mainapp from './components/Mainapp';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Login></Login>
        <Mainapp></Mainapp>
      </div>
    );
  }
}

export default App;
