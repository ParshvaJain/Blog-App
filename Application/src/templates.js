import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
//import Image from 'react-bootstrap/Image';
//import Container from 'react-bootstrap/Container'
  
import { Link } from 'react-router-dom'

class PageHeader extends Component {
    constructor(props){
      super(props);
      this.gotoProfile = this.gotoProfile.bind(this);
    }

    gotoProfile(){
      this.props.history.push("/profile");

    }

    render(){
      if(this.props.loginPage== true)
      {
        return(
          <Navbar bg="light">
            <Navbar.Brand>ReadBlogs</Navbar.Brand>
            {/* <Navbar.Collapse className="justify-content-end"> */}
            {/* <Link to="/home">
              <Button style={{margin:"10px"}}variant="outline-success">All Articles</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline-success">Profile Page</Button>
            </Link>
            </Navbar.Collapse> */}
          </Navbar>
        )



      }
      else{

        return(
          <Navbar bg="light">
            <Navbar.Brand>ReadBlogs</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
            <Link to="/home">
              <Button style={{margin:"10px"}}variant="outline-success">All Articles</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline-success">Profile Page</Button>
            </Link>
            </Navbar.Collapse>
          </Navbar>
          )
        } 
    }
  }
  
  export default PageHeader