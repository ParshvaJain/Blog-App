import React, { Component } from 'react';
import PageHeader from './templates'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import "./LoginPage.css"
//import { response } from 'express';

class CardTemplate extends Component {

    constructor(props){
        super(props);
        this.state = {
            message : "",
            color : "",
            selectedFile : "",
            fileName: ""
        }

        this.sendRequest = this.sendRequest.bind(this)
        this.getData = this.getData.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    getData(e){
        e.preventDefault();
        var email = document.getElementById("formBasicEmail").value;
        var pass = document.getElementById("formBasicPassword").value;
        var name = document.getElementById("firstName").value + " " + document.getElementById("secondName").value;
        this.sendRequest(email,pass,name);
       
    }

    onChangeHandler(event){
        this.setState({
          selectedFile: event.target.files[0],
          message:"",
          color:"",
          fileName: event.target.files[0].name
        })
      }

    sendRequest(email,password,name){
        var fd = new FormData();
        fd.append("email",email);
        fd.append("password",password);
        fd.append("name",name);
        fd.append("userImage",this.state.selectedFile,this.state.selectedFile.name);

        var requestOptions = {
            method : 'POST',
            body : fd
        }

        fetch('/users/signup',requestOptions).then(response=> response).then(response =>{
            if(response.status == 409){
                this.setState({
                    message:"An account with the user already exists",
                    color:"red",
                    selectedFile:this.state.selectedFile,
                    fileName:this.state.fileName
                })
            }
            else if(response.status == 201){
                this.setState({
                    message:"Account Successfully created",
                    color:"green",
                    selectedFile:this.state.selectedFile,
                    fileName:this.state.fileName
                })
            }
        })

        

    }
    

    render(){
        var messagestyle = {
            fontSize : '15px',   
            color : this.state.color
        }
    return( 
        <Container id="card" md="auto">
            <Card className="text-center">
                <Card.Header>{this.props.type}</Card.Header>
                <Card.Body>
                    
                    <Form className="justify-content-center" onSubmit={this.getData} enctype="multipart/form-data">
                        <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                            <Form.Row>
                                <Col>
                                    <Form.Control id="firstName" placeholder="First name"  required/>
                                </Col>
                                <Col>
                                    <Form.Control id="SecondName" placeholder="Last name" />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control  type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" minLength='8' required />
                        </Form.Group>
                        <Form.File 
                            id="imagefile"
                            label={this.state.fileName}
                            accept="image/*"
                            onChange={this.onChangeHandler}
                            required
                            custom
                        />
                        <Card.Text style={ {fontSize : '12px'} }>For your Profile Picture</Card.Text>
                        <Card.Text style={messagestyle}>{this.state.message}</Card.Text> 
                        <Button variant="primary" type="submit">
                            {this.props.type}
                        </Button>
                    </Form>
                       
                </Card.Body>
                <Card.Footer className="text-muted">{this.props.text} <a> {this.props.hlinktext}</a></Card.Footer>
            </Card>
        </Container>
)}
}

class SignupPage extends Component{

    render(){
        return (
            <React.Fragment>
                <PageHeader/>
                <br></br>
                <br></br>
                <CardTemplate  type="Sign Up" text="Already a Reader " hlinktext="Login In"/>
            </React.Fragment>
                  
        )
    }
}






export default SignupPage