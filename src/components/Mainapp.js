import React, {Component, Fragment} from 'react';
import axios from 'axios';
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
      chatList:[
        {id:1,title:'채팅방1',memberNum:5,recentMsg:'최근메시지1최근메시지1최근메시지1최근메시지1최근메시지1최근메시지1최근메시지1',recentTime:'오후 3:15',isNear:true},
        {id:2,title:'채팅방2',memberNum:32,recentMsg:'최근메시지2',recentTime:'오후 4:15',isNear:true,},
        {id:3,title:'채팅방3',memberNum:1,recentMsg:'최근메시지3',recentTime:'오후 12:12',isNear:true,},
        {id:4,title:'비활성 채팅방1',memberNum:4,recentMsg:'근처에 있지 않아 참여할 수 없습니다.',recentTime:'오후 6:11',isNear:false,},
        {id:5,title:'비활성 채팅방2',memberNum:9,recentMsg:'근처에 있지 않아 참여할 수 없습니다.',recentTime:'오후 11:04',isNear:false,},
      ],
    }
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      res=>{
        const lat = res.coords.latitude;
        const long = res.coords.longitude;
        this.setState({currentCoords:{latitude: lat,longitude: long}})
      },
      err=>console.log('[getCurrentPosition] err',err)
    )
  }
  onSubmit=(...data)=>{
    if(!this.state.currentCoords.latitude || !this.state.currentCoords.longitude) {
      throw '아직 현재 위치를 잡지 못했습니다.';
    } else {
      const dataLoad = {
        chatRoomTitle: String(...data),
        mapMarkerLocation: `(${this.state.currentCoords.latitude}, ${this.state.currentCoords.longitude})`
      }
      console.log(JSON.stringify(dataLoad));
      const SIGN_UP_URL='/chatroom/create';
      console.log('Submit', ...data);
      axios({method:'post', url:SIGN_UP_URL, data:JSON.stringify(dataLoad)})
        .then(function (res) {
          console.log('[채팅방 개설] 완료', ...data)
          console.log(res);
        })
        .catch(function (err) {
          console.log('[채팅방 개설] 실패', ...data)
          console.log(err);
        });
    }
  }
  render() {
    const {currentCoords,defaultCoords} = this.state
    return (
      <Fragment>
        <Mgkmap
          currentCoords={currentCoords}
          defaultCoords={defaultCoords}
        ></Mgkmap>
        <Chatlist
          chatList={this.state.chatList}
          onSubmit={this.onSubmit}
        ></Chatlist>
      </Fragment>
    );
  }
}

export default Mainapp;
