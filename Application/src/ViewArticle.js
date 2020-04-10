import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

class ViewArticle extends Component {

    constructor(props){
        super(props);

        this.state = {
            articleTitle :"",
            articleContent: "",
            articleSubtitle: "",
            comments:[]
        }

        this.showData = this.showData.bind(this);
        this.showComments = this.showComments.bind(this);
    }

    showComments(){
        var ele = [];
        for(var i=0 ; i< this.state.comments.length; i++){
            console.log(this.state.comments[i]);
            var comment = <InputGroup size="sm" className="mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{this.state.comments[i].authorName}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="textarea" aria-label="Small"  placeholder={this.state.comments[i].text}  readOnly="readOnly" />
                          </InputGroup>
            ele.push(comment)
        }
        // console.log(ele)
        return ele
    }

    showData(data){
        //console.log(data);
        this.setState(
                {
                    articleTitle:data.title,
                    articleContent:data.text,
                    articleSubtitle:data.subtitle,
                    comments:data.comments
                }
            )
    }
    componentDidMount(){
        var requestOptions = {
            method: "GET",
            headers: { "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtra0BnbWFpbC5jb20iLCJ1c2VyaWQiOiI1ZThlMGViMGI3YWJhNzIyMTBhZDU5ZjciLCJpYXQiOjE1ODY0OTU5NzksImV4cCI6MTU4NjQ5OTU3OX0.uHF0zHZQeeNjudZTmO0bmIM2QCm1ZXmoRMLad7lQGWQ",
                        'Content-type': "application/x-www-form-urlencoded" }
        }
        fetch("/articles/"+this.props.articleId,requestOptions).then(response=> response.json()).then(this.showData) 
    }

    render(){
        return( 
            <React.Fragment>
                <PageHeader/>
                <br></br>
                <Container>
                    <Card>
                        <Card.Header> 
                            <h2 className ="text-center">{this.state.articleTitle}</h2> 
                            <h5 className = "text-center" > {this.state.articleSubtitle}</h5>
                        </Card.Header>
                        <Card.Body style={{overflowY:'auto',maxHeight:screen.height}}>
                            <Card.Text >{this.state.articleContent}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Container>
                                <h4>Comments</h4>
                                <br></br>
                                    {this.showComments()}
                            </Container>
                        </Card.Footer>
                    </Card>
                </Container>
            </React.Fragment>
        )


    }
}

export default ViewArticle;


