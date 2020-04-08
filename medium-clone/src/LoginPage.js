import React, { Component } from 'react';
import PageHeader from './templates'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

import "./LoginPage.css"
//import { response } from 'express';

class CardTemplate extends Component {

    constructor(props){
        super(props);
        this.state = {
            message : "",
            color : ""
        }

        this.sendRequest = this.sendRequest.bind(this)
        this.verifyData = this.verifyData.bind(this)
    }

    verifyData(e){
        e.preventDefault();
        var email = document.getElementById("email").value;
        var pass = document.getElementById("password").value;
        console.log(email,pass);
        this.sendRequest(email,pass);
       
    }

    sendRequest(email,password){
        var requestOptions = {
            method : 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : 'email='+email+'&password='+password
        }

        fetch('/users/login',requestOptions).then(response=> {
            console.log(response,response.status)
            if(response.status == 401){
                console.log("Invalid User");
                this.setState({message : "Invalid User",color:"red"});
            }
            else{
                console.log("Valid User")
                this.setState({message : "Login Successfull",color:"green"});
                this.props.functioncall("hello")
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
                    
                    <Form className="justify-content-center" onSubmit={this.verifyData}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Password" minLength='8' required />
                        </Form.Group>
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

class LoginPage extends Component{

    render(){
        return (
            <React.Fragment>
                <PageHeader/>
                <br></br>
                <br></br>
                <CardTemplate functioncall={this.props.functioncall} type="Login" text="Not a Frequent Reader ?" hlinktext="Sign Up"/>
            </React.Fragment>
                  
        )
    }
}






export default LoginPage