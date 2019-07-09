import React, { Component } from 'react';
import axios from 'axios';

class Mypage extends Component {
  constructor(props){
    super(props);
    this.state={
      email:this.props.email,
      username:this.props.username,
    }
    this.fileInput = React.createRef();
  }
  editInfo(){
    const EDIT_INFO_URL= '';
    const {email, username, imgUrl} = this.state;
    axios({method: 'post', url: EDIT_INFO_URL,
      data: {email:email,username:username,imgUrl:this.fileInput,}
    })
    .then(function (response) {console.log(response);})
    .catch(function (error) {console.log(error);});
  }

  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value})
  }
  // fileFormHandler(e) {
  //   e.preventDefault();
  //   alert(
  //     `Selected file - ${
  //       this.fileInput.current.files[0].name
  //     }`
  //   );
  // }
  render(){
    console.log(this.props.username)
    return (
      <section>
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
          {/* <input type="file" name="img" ref={this.fileInput} /> */}
          <input type="submit"/>
        </form>
      </section>
    );
  }
}

export default Mypage;