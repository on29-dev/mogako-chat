import React, { Component, Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      username:'',
      imgUrl:'',
      idToken:'',
      accessToken:''
    }
  }
  signup(){
    const SIGN_UP_URL='';
    const {email, username, imgUrl,idToken,accessToken} = this.state;
    axios({
      method: 'post',
      url: SIGN_UP_URL,
      data: {
        email:email,
        username:username,
        imgUrl:imgUrl,
        idToken:idToken,
        accessToken:accessToken
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }
  responseGoogle(res){
    const tokens = res.tokenObj;
    const profiles = res.profileObj;
    this.setState({
      email:profiles.email,
      username:profiles.name,
      imgUrl:profiles.imageUrl,
      idToken:tokens.id_token,
      accessToken:tokens.access_token
    })
    this.Signup()
  }
  responseFail(err){console.log(err)}
  render(){
    return (
      <Fragment>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseFail}
        />
      </Fragment>
    );
  }
}

export default Login;