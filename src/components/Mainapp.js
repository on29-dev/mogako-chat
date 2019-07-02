import React, {Component, Fragment} from 'react';
import Header from './Header';
import Mgkmap from './Mgkmap';
import Chatlist from './Chatlist';

class Mainapp extends Component {
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
      <Fragment>
        <Header></Header>
        <Mgkmap
          currentCoords={currentCoords}
          defaultCoords={defaultCoords}
        ></Mgkmap>
        <Chatlist></Chatlist>
      </Fragment>
    );
  }
}

export default Mainapp;
