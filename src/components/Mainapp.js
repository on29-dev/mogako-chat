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
  setCurrentCoords=(lat,long)=>{
    this.setState({currentCoords:{latitude:lat,longitude:long}})
    const userid = this.props.userid
    const CURRENT_LOCATION_URL=`/members/${userid}/auth-location`;
    const dataLoad = {
      memberCurrentGeolocation: `(${lat}, ${long})`
    }
    axios({method:'post', url:process.env.REACT_APP_SERVER_SOCKET_ID+CURRENT_LOCATION_URL,data:JSON.stringify(dataLoad),
        // headers:{'Access-Control-Allow-Origin': '*','Access-Control-Max-Age': '3600'}
      })
        .then(res => {
          console.log('res',res);
        })
        .catch(err => {
          console.log('err',err);
        })
  }
  onSubmit=(...data)=>{
    if(!this.state.currentCoords.latitude || !this.state.currentCoords.longitude) {
      // throw '아직 현재 위치를 잡지 못했습니다.'
    } else {
      const dataLoad = {
        chatRoomTitle: String(...data),
        mapMarkerLocation: `(${this.state.currentCoords.latitude}, ${this.state.currentCoords.longitude})`
      }
      console.log(JSON.stringify(dataLoad));
      const SIGN_UP_URL='/chatroom/create';
      console.log('Submit', ...data);
      axios({method:'post', url:process.env.REACT_APP_SERVER_SOCKET_ID+SIGN_UP_URL,data:JSON.stringify(dataLoad),
        headers:{'Access-Control-Allow-Origin': '*','Access-Control-Max-Age': '3600'}
      })
        .then(res => {
          console.log('[채팅방 개설] 완료', ...data)
          console.log('res',res);
          this.props.history.push({
            pathname: "/chatroom",
            state: {chatRoomId:res.id}
          })
        })
        .catch(err => {
          console.log('[채팅방 개설] 실패', ...data)
          console.log(err);
        })
    }
  }
  render() {
    return (
      <Fragment>
        <Mgkmap
          currentCoords={this.props.currentCoords}
          setCurrentCoords={this.setCurrentCoords}
          defaultCoords={this.state.defaultCoords}
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
