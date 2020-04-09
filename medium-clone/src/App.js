import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


import LoginPage from './LoginPage'
import ViewArticle from './ViewArticle'



class App extends Component {
  render() {
    return (
      <ViewArticle articleId="5e8b8c9edd3bbd1b4c54199d"  />
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
