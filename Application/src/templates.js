import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
//import Image from 'react-bootstrap/Image';
//import Container from 'react-bootstrap/Container'


class PageHeader extends Component {
    render(){
      return(
        <Navbar bg="light">
          <Navbar.Brand>TechBlogs</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-success">Login</Button>{' '}
          </Navbar.Collapse>
        </Navbar>
      )
    }
  }
  
  export default PageHeader