import React, { Component, Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      username:'',
      imgUrl:'',
      idToken:'',
    }
  }
  responseGoogle(res){
    const tokens = res.tokenObj;
    const profiles = res.profileObj;
    this.setState({
      email:profiles.email,
      username:profiles.name,
      imgUrl:profiles.imageUrl,
      idToken:tokens.id_token
    })
  }
  responseFail(err){console.log(err)}
  render(){
    return (
      <Fragment>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseFail}
        />
      </Fragment>
    );
  }
}

export default Login;