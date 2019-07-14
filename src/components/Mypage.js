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
          <h2 className="mypage-title">회원정보 수정</h2>
          <div className="mypage-content">
            <img className="mypage-img"
            src={this.state.img ? URL.createObjectURL(this.state.img) : (this.state.imgUrl)}
            alt={this.state.img ? this.state.img.name : "현재 이미지"}
            />
            <label className="img-uploader" htmlFor="profileImg"><span className="hidden">업로드</span></label>
            <input type="file" name="img" id="profileImg" className="hidden"
              ref={this.fileInput}
              onChange={e=>{
                e.preventDefault();
                console.log(this.fileInput.current.files);
                if(this.fileInput.current.files.length === 0) {console.log('파일 업로드가 취소되었습니다.')}
                else {
                  const file = this.fileInput.current.files[0];
                  this.setState({
                    img:file,
                    imgUrl:URL.createObjectURL(file)
                  });
                  this.props.onSubmit(this.state.img);
                }
              }}
            />
            <form action="/update" method="POST"
              onSubmit={e=>{
                e.preventDefault();
                this.props.onSubmit(
                  this.state.email, this.state.username
                );
              }}
            >
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email"
                value={this.state.email}
                onChange={e=>this.inputFormHandler(e)}
              />
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username"
                value={this.state.username}
                onChange={e=>this.inputFormHandler(e)}
              />
              <input type="submit" className="btn btn-submit" value="수정하기"/>
            </form>
          </div>
          <i className="fas fa-times btn-close" onClick={this.props.onClose}></i>
        </div>
      </section>
    );
  }
}

export default Mypage;