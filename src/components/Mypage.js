import React, { Component } from 'react';
import axios from 'axios';
import '../style/mypage.css'

class Mypage extends Component {
  constructor(props){
    super(props);
    this.state={
      email:this.props.email,
      username:this.props.username,
      imgUrl:this.props.imgUrl,
      img:null,
    }
    this.fileInput = React.createRef();
  }
  editInfo(){
    const EDIT_INFO_URL= '';
    const {email, username} = this.state;
    axios({method: 'post', url: EDIT_INFO_URL,
      data: {email:email,username:username,}
    })
    .then(function (response) {console.log(response);})
    .catch(function (error) {console.log(error);});
  }

  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value})
  }
  render(){
    return (
      <section className="modal">
        <div className="mypage">
          <h2>회원정보수정</h2>
          <form action="/update" method="POST"
            onSubmit={e=>{
              e.preventDefault();
              this.props.onSubmit(
                this.state.email, this.state.username, this.state.imgUrl,
              );
            }}
          >
            <input type="email" name="email"
              value={this.state.email}
              onChange={e=>this.inputFormHandler(e)}
            />
            <input type="text" name="username"
              value={this.state.username}
              onChange={e=>this.inputFormHandler(e)}
            />
            <input type="submit"/>
          </form>
          <form action="/updateImg" method="POST"
            onSubmit={e=>{
              e.preventDefault();
              this.props.onSubmit(
                this.state.img,
              );
            }}
          >
            <input type="file" name="img" ref={this.fileInput}
              onChange={e=>{
                e.preventDefault();
                const file = this.fileInput.current.files[0];
                this.setState({
                  img:file,
                  imgUrl:URL.createObjectURL(file)
                })
              }}
            />
            <input type="submit"/>
          </form>
          <img style={{width: 100 + 'px'}} 
            src={this.state.img ? URL.createObjectURL(this.state.img) : (this.state.imgUrl)}
            alt={this.state.img ? this.state.img.name : "현재 이미지"}
          />
          <button onClick={this.props.onClose}>닫기</button>
        </div>
      </section>
    );
  }
}

export default Mypage;