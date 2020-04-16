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
import FormControl from 'react-bootstrap/FormControl'

class ProfilePage extends Component{
  constructor(props){
    super(props);

    this.state ={
        datafetched: {},
        imagesrc:"",
        articles:"",
        numberofArticles:"",
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
        var banner = <BlogBanner key={i} 
                                 blogId={data[i]._id} 
                                 userImage={data[i].userImage} 
                                 blogTitle={data[i].title}
                                 authorname={data[i].authorname} 
                                 blogContent={data[i].subtitle}
                                 tags={data[i].tags}
                                 />
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
                            var likes = 0;
                            var comments = 0;
                            let article_list =[]
                            for(var i=0; i<data.length;i++){
                                if(data[i].authorId == userId){
                                    likes +=data[i].likes
                                    comments +=data[i].comments.length
                                    article_list.push(data[i]);
                                }
                            }
                            this.setState({
                                articles:article_list,
                                likes:likes,
                                comments:comments
                            });
                            console.log(this.state);
                        });
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
                            <Container>
                                <Image style={{height:'200px'}} src={this.state.imagepath}  rounded></Image>
                                <Container><h4>{this.state.datafetched.name}</h4></Container>
                            </Container>
                            </Col>
                            <Col md={7}>
                                <Container>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="email">
                                        Email
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" value={this.state.datafetched.email} aria-describedby="email" disabled/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="email">
                                        Number of Articles
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" value={this.state.articles.length} aria-describedby="email" disabled/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="email">
                                        Total Likes
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" value={this.state.likes} aria-describedby="email" disabled/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="email">
                                        Total Comments
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" value={this.state.comments} aria-describedby="email" disabled/>
                                </InputGroup>
                                    <WriteArticle getAuthToken={this.props.getAuthToken} updateComponent={this.fetchData} getUserName={this.props.getUserName} getUserId={this.props.getUserId} ></WriteArticle>
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
            fileName:"Article",
            message: "",
            color:"",
            article:"",
            tags:[]
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.readArticle = this.readArticle.bind(this);
        this.fetchTags = this.fetchTags.bind(this);
        this.displayTags = this.displayTags.bind(this);
        this.addTag = this.addTag.bind(this);
        self = this;
    }

    displayTags(){
        var tags = this.state.tags
        var button_list = [];
        if(tags.length != 0){
            for(var i=0; i<tags.length; i++){
                var button = <Button style={{margin:'5px'}} onClick={this.addTag} variant="outline-info" size="sm" >{tags[i]}</Button> ;
                button_list.push(button);
            }
            return button_list;
        }

    }
    addTag(event){
        if(document.getElementById("tags").value == "")
            document.getElementById("tags").value +=event.target.innerHTML
        else
            document.getElementById("tags").value +="," + event.target.innerHTML

    }

    fetchTags(){
        if(this.state.article == ""){
            this.setState({
                message:"Please Upload the Article first",
                color:"orange"                
            })
        }
        else{
            this.setState({
                message:"",
                color: ""
            })

            var urlencoded = new URLSearchParams();
            urlencoded.append("text",this.state.article);

            var requestOptions ={
                method:"POST",
                headers:{"Authorization":"Bearer "+this.props.getAuthToken()},
                body: urlencoded
            }

            fetch("/articles/getTags",requestOptions)
                .then(response => response.json())
                .then(data => this.setState({tags:data}));
            
        }

    }

    saveArticle(event){
        event.preventDefault();
        let title = document.getElementById("title").value
        let subTitle = document.getElementById("title").value
        let tags = document.getElementById("tags").value
        if(title=="" || subTitle==""){
            this.setState({
                message:"Please Fill all the Fields",
                color:"red"                
            })
        }
        else {
            var data = {
                title:title,
                subtitle:subTitle,
                text:self.state.article,
                readingtime:2,
                authorname:self.props.getUserName(),
                authorId:self.props.getUserId(),
            }
            var urlencoded = new URLSearchParams();
            urlencoded.append("title", data.title);
            urlencoded.append("subtitle", data.subtitle);
            urlencoded.append("text",data.text)
            urlencoded.append("authorId", data.authorId);
            urlencoded.append("readingtime", data.readingtime);
            urlencoded.append("authorName", data.authorname);
            urlencoded.append("tags",tags);
            
            var requestOptions ={
                method:"POST",
                headers:{"Authorization":"Bearer "+ self.props.getAuthToken()},
                body:urlencoded
            }
            fetch("/articles/newArticle",requestOptions)
                .then(response => {
                    var message = {}
                    if(response.status == 200){
                        console.log("SuccessFull");
                        message = {message:"Successfully Saved",color:"green"};
                    }
                    else{
                        message = {message:"Some Error Has Occured",color:"red"}
                    }
                    self.setState(message);
                })


        }


    }
    
    handleShow(){
        this.setState({
            showModal:true
        })
    }

    
    handleClose(){
        this.setState({
            showModal:false,
            fileName:"Article",
            message: "",
            color:"",
            article:"",
            tags:[]
        })
        console.log(this.props);
        this.props.updateComponent();
    }
    
    readArticle(event){
        var reader = new FileReader()
        let file = document.getElementById("article")
        reader.readAsText(file.files[0])
        reader.onload = function (){
            self.setState({
                fileName:file.files[0].name,
                article:reader.result
            })
        console.log(self.state);
        }   
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
                                    onChange ={this.readArticle}
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
                                        <Button  variant="success" onClick={this.fetchTags}>Generate</Button>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                {this.displayTags()}
                            </Form.Group>
                            <p style={{color:this.state.color}}>
                                {this.state.message}
                            </p>
                            <Button variant="primary" type='submit' onClick={this.saveArticle}>
                                Submit 
                            </Button>
                        
                        </Form>
                    </Modal.Body>
                    <Modal.Footer >
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