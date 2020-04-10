import React, { Component } from 'react';
import PageHeader from './templates'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'

import "./LoginPage.css"
//import { response } from 'express';

import { Link } from 'react-router-dom'
import {
  withRouter
} from 'react-router-dom'


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
        this.sendRequest(email,pass);
       
    }

    sendRequest(email,password){
        var requestOptions = {
            method : 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : 'email='+email+'&password='+password
        }

        fetch('/users/login',requestOptions).then(response =>{
            if(response.status === 401){
                console.log("Invalid User");
                this.setState({message : "Invalid User",color:"red"});
            }
            else{
                this.setState({message : "Login Successfull",color:"green"});
                return response.json()
            }
            return null;
            }).then( data => {
                    if(data!=null){
                        this.props.authFunction(data.token,data.userId,data.userName);
                        this.props.history.push("/home");
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
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Password" minLength='8' required />
                        </Form.Group>
                        <Card.Text style={messagestyle}>{this.state.message}</Card.Text> 
                        <Button variant="primary" type="submit">
                            {this.props.type}
                        </Button>
                    </Form>
                       
                </Card.Body>
                <Card.Footer className="text-muted">{this.props.text}<Link to={this.props.hlink}> {this.props.hlinktext}</Link></Card.Footer>
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
                <CardTemplate {...this.props} authFunction={this.props.authFunction} history={this.props.history} type="Login" text="Not a Frequent Reader ?" hlinktext="Sign Up" hlink="/signup" />
            </React.Fragment>
                  
        )
    }
}






export default withRouter(LoginPage);