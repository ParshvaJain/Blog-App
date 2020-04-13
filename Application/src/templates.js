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


      return(
        <Navbar bg="light">
          <Navbar.Brand>TechBlogs</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Link to="/profile">
            <Button variant="outline-success">Profile Page</Button>
          </Link>
          </Navbar.Collapse>
        </Navbar>
      )
    }
  }
  
  export default PageHeader