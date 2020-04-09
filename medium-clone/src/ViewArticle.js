import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'


class ViewArticle extends Component {

    constructor(props){
        super(props);

        this.state = {
            articleTitle :"",
            articleContent: "",
            articleSubtitle: ""
        }

        this.showData = this.showData.bind(this)
    }


    showData(data){
        console.log(data);
        this.setState(
                {
                    articleTitle:data.title,
                    articleContent:data.text,
                    articleSubtitle:data.subtitle
                }
            )
    }
    componentDidMount(){
        var requestOptions = {
            method: "GET",
            headers: { "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtra0BnbWFpbC5jb20iLCJ1c2VyaWQiOiI1ZThlMGViMGI3YWJhNzIyMTBhZDU5ZjciLCJpYXQiOjE1ODY0MzgxMjQsImV4cCI6MTU4NjQ0MTcyNH0.VhuN3Wb5Ckqk6E2rgXm22D5S4JTcKAwf5Wae65AV8xo",
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
                            <h5 className = "text-center"> {this.state.articleSubtitle}</h5>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{this.state.articleContent}</Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        )


    }
}

export default ViewArticle;


