import React, {Component, Fragment} from 'react';
import Mgkmap from './Mgkmap';
import Chatlist from './Chatlist';
import '../style/chatmap.css'

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
    navigator.geolocation.getCurrentPosition(
      res=>{
        const lat = res.coords.latitude;
        const long = res.coords.longitude;
        this.setState({currentCoords:{longitude: long,latitude: lat}})
      },
      err=>console.log('[getCurrentPosition] err',err)
    )
  }
  render() {
    const {currentCoords,defaultCoords} = this.state
    return (
      <Fragment>
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
