import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import HomePage from './HomePage'
import { Route, Switch } from 'react-router-dom'
import ViewArticle from './ViewArticle';
import ProfilePage from './ProfilePage';

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
    this.getUserId = this.getUserId.bind(this);
    this.getUserName = this.getUserName.bind(this);
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

  getUserId(){
    return (this.state.userId);
  }

  getUserName(){
    return (this.state.userName);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <LoginPage {...props} getAuthToken={this.getAuthToken} authFunction={this.setAuth} /> }/>
        <Route path="/signup" render={(props) => <SignupPage {...props} />} />
        <Route path="/home"   render={(props) => <HomePage  getAuthToken={this.getAuthToken} {...props} />} />
        <Route path="/readArticle/:id" render={(props) => <ViewArticle getAuthToken={this.getAuthToken} getUserId={this.getUserId} getUserName={this.getUserName} {...props} />} />
        <Route path="/profile" render={(props) => <ProfilePage getAuthToken={this.getAuthToken} getUserId={this.getUserId} getUserName={this.getUserName} {...props} />} />
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
