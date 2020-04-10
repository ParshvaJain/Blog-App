import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { withRouter } from 'react-router';

class ViewArticle extends Component {

    constructor(props){
        super(props);
        var pathArray = this.props.location.pathname.split('/')

        
        this.state = {
            articleId:pathArray[pathArray.length -1],
            articleTitle :"",
            articleContent: "",
            articleSubtitle: "",
            comments:[],
            likes:0
        }

        // console.log(this.state,pathArray[pathArray.length -1])
        console.log(this.props)
        this.showData = this.showData.bind(this);
        this.showComments = this.showComments.bind(this);
        this.likeArticle = this.likeArticle.bind(this);
    }

    showComments(){
        var ele = [];
        for(var i=0 ; i< this.state.comments.length; i++){
            // console.log(this.state.comments[i]);
            var comment = <InputGroup size="sm" className="mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{backgroundColor:'#34e2eb'}} id="basic-addon1">{this.state.comments[i].authorName}</InputGroup.Text>
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
                    articleId:this.state.articleId,
                    articleTitle:data.title,
                    articleContent:data.text,
                    articleSubtitle:data.subtitle,
                    comments:data.comments,
                    likes:data.likes
                }
            )
    }
    componentDidMount(){

        var requestOptions = {
            method: "GET",
            headers: { "Authorization":"Bearer " + this.props.getAuthToken(),
                        'Content-type': "application/x-www-form-urlencoded" }
        }
        fetch("/articles/"+this.state.articleId,requestOptions).then(response=> response.json()).then(this.showData) 
    }

    likeArticle(){





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
                                <Container style={{display:"flex",justifyContent:"space-between"}}>
                                    <h4>Comments</h4>
                                    <div>
                                        <ButtonGroup>
                                            <Button variant="success" onClick={this.likeArticle}>Likes</Button>
                                            <Button variant="warning" disabled  > {this.state.likes}</Button>
                                        </ButtonGroup>
                                        
                                    </div>
                                </Container>
                                <br></br>
                                    {this.showComments()}
                                    <InputGroup size="sm" className="mb-3" >
                                        <InputGroup.Prepend>
                                            <InputGroup.Text style={{backgroundColor:'#34e2eb'}} id="basic-addon1">{this.props.getUserName()}</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" aria-label="Small"  placeholder="Write Your Comment here.."/>
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary">Comment</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                            </Container>
                        </Card.Footer>
                    </Card>
                </Container>
            </React.Fragment>
        )


    }
}

export default withRouter(ViewArticle);


