import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import LoginPage from './LoginPage'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: ""
    }
    this.addtoken = this.addtoken.bind(this);
  }

  addtoken(newtoken){
    this.setState(
      {
        token :newtoken
      }
    )
    console.log("called");
  }
  
  render() {
    return (
      <LoginPage functioncall={this.addtoken} />
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
