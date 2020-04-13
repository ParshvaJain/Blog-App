import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'   
import Row from 'react-bootstrap/Row'
import {BlogBanner} from './HomePage'


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

export default ProfilePage