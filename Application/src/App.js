import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import HomePage from './HomePage'
import { Route, Switch } from 'react-router-dom'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        authToken:"",
        userId:"",
        userName:""
    }
    this.setAuth = this.setAuth.bind(this);
    this.getAuthToken = this.getAuthToken.bind(this);
    this.getuserId = this.getuserId(this);
    this.getuserName = this.getuserName(this);
  }

  setAuth(authToken,userId,userName){
    console.log("New Auth set")
    this.setState(
      {
        authToken:authToken,
        userId:userId,
        userName:userName
      }
    )
  }

  getAuthToken(){
    return (this.state.authToken);
  }

  getuserId(){
    return this.state.userId;
  }

  getuserName(){
    return this.state.userName;
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <LoginPage {...props} getAuthToken={this.getAuthToken} authFunction={this.setAuth} /> }/>
        <Route path="/signup" render={(props) => <SignupPage {...props} />} />
        <Route path="/home"   render={(props) => <HomePage  getAuthToken={this.getAuthToken} {...props} />} />
      </Switch>
    // <HomePage/>      
      // <ViewArticle articleId="5e27282ef1e4660ab82ed16d"/>
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
