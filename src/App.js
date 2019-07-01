import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Mgkmap from './components/Mgkmap';
import Chatlist from './components/Chatlist';

class App extends Component {
  constructor(props){
    // 초기화 담당
    super(props);
    this.state = {
      currentCoords:{
        longitude:0,
        latitude:0
      },
      defaultCoords:{
        longitude: 127.027711,
        latitude:37.497997
      },
    }
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.setState({currentCoords:{longitude: long,latitude: lat}})
    })
  }
  render() {
    const {currentCoords,defaultCoords} = this.state
    return (
      <div className="App">
        <Header></Header>
        <Mgkmap
          currentCoords={currentCoords}
          defaultCoords={defaultCoords}
        ></Mgkmap>
        <Chatlist></Chatlist>
      </div>
    );
  }
}

export default App;
