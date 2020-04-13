import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'   
import Row from 'react-bootstrap/Row'
import {BlogBanner} from './HomePage'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { text } from 'express'

class ProfilePage extends Component{
  constructor(props){
    super(props);

    this.state ={
        datafetched: {},
        imagesrc:"",
        articles:""
    }

    this.fetchData = this.fetchData.bind(this);
    this.showArticles = this.showArticles.bind(this);
  }



  componentDidMount(){
    this.fetchData();
  }

  showArticles(){

    var data = this.state.articles
    console.log(data)
    var BlogBannerList =[]

    for(var i=0;i<data.length; i++){
        var banner = <BlogBanner key={i} blogId={data[i]._id} userImage={data[i].userImage} blogTitle={data[i].title} authorname={data[i].authorname} blogContent={data[i].subtitle}/>
        BlogBannerList.push(banner);
    }
    
    return BlogBannerList;
}


  fetchUserArticles(userId){
    var requestOptions = {
        method: "GET",
        headers: {"Authorization":"Bearer "+ this.props.getAuthToken()}
    }

    var articles = fetch("articles/getAll",requestOptions)
                        .then(response => response.json())
                        .then(data =>{
                            let article_list =[]
                            for(var i=0; i<data.length;i++){
                                if(data[i].authorId == userId){
                                    article_list.push(data[i]);
                                }
                            }
                            this.setState({articles:article_list});
                            console.log(this.state);
                        });
    console.log(articles)
    return <p>hi!!</p>
  }
  fetchData(){
    var requestOptions = {
        method: "GET",
        headers: {"Authorization":"Bearer "+ this.props.getAuthToken()}
    }
    var url ="/users/"+this.props.getUserId();
    console.log(url);
    fetch(url,requestOptions)
        .then((response) =>{
            if(response.ok){
                return response.json()
            }
            else{
                this.props.history.push("/")
            }
        })
        .then(data => {
            var imagesrc = require("../server/uploads/" + data.userImage.split("\\")[1]);
            // console.log(data);
            this.setState({datafetched:data,imagepath:imagesrc,articles:""})
                
        });
    this.fetchUserArticles(this.props.getUserId());

  }



  render(){
       
        return(
            <React.Fragment>
            <PageHeader/>
            <br></br>
            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={5}>
                            <Image style={{height:'200px'}} src={this.state.imagepath}  rounded></Image>
                            <h4>{this.state.datafetched.name}</h4>
                            </Col>
                            <Col md={7}>
                                <Container>
                                    <p>Email :{this.state.datafetched.email}</p>
                                    <WriteArticle{... this.props}></WriteArticle>
                                </Container>
                            </Col>    
                        </Row>    
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card>
                    <Card.Body>    
                        {this.showArticles()}
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
        )



    }
}


class WriteArticle extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            fileName:"Article"
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.updateLabel = this.updateLabel.bind(this);
    }

    saveArticle(event){
        event.preventDefault();
        let title = document.getElementById("title").value
        let subTitle = document.getElementById("title").value
        let tags = document.getElementById("tags").value
        let file = document.getElementById("article")
        var reader = new FileReader()
        reader.readAsText(file.files[0])
        reader.onload = function (){
            var article = reader.result;
            var data = {
                title:title,
                subtitle:subtitle,
                text:article,
                readingtime:2,
                authorname:this.props.getUserName(),
                authorId:this.props.getUserId(),
            }
            
            var requestOptions ={
                method:"POST",
                headers:{"Authorization":"Bearer "+ this.props.getAuthToken()},
                body:data    
            }


            fetch("/article/newArticle",re)


            
        }

    }
    
    handleShow(){
        this.setState({
            showModal:true
        })
    }

    
    handleClose(){
        this.setState({
            showModal:false
        })
    }
    
    updateLabel(event){
        this.setState({
            fileName:event.target.files[0].name
        })
    }
    
    render(){
        return (
            <React.Fragment>
                <Button variant="danger" onClick={this.handleShow}>
                    Write Article
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Submit an Article</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="title" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" rows="3" required />
                            </Form.Group>
                            <Form.Group controlId="subtitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control as="textarea" rows="3" required />
                            </Form.Group>
                            <Form.Group>
                                <Form.File 
                                    id="article"
                                    label={this.state.fileName}
                                    onChange ={this.updateLabel}
                                    required
                                    custom
                                />
                            </Form.Group>
                            <Form.Group controlId="tags">
                                <Form.Label>Tags</Form.Label>
                                <Form.Row>
                                    <Col md={9}>
                                        <Form.Control  label="" type="text" rows="2"></Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <Button  variant="success">Generate</Button>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Button variant="primary" type='submit' onClick={this.saveArticle}>
                                Submit 
                            </Button>
                        
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal> 
            </React.Fragment>
        )
        }
}

export default ProfilePage