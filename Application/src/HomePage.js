import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

class BlogBanner extends Component {

    render(){
    //   var imageStyle ={
    //     display:"inline"
    //   }
    //   var contentStyle = {

        
    //   }
  
      return (
      <div>
        {/* <Image src={this.props.imagesrc} roundedCircle  style={imageStyle}/> */}
        {/* <div style={contentStyle}>
          <h1>{this.props.blogTitle}</h1>
          <p>By-{this.props.authorName}</p>
          <p>{this.props.blogContent}</p>
        </div> */}
        <Link to={"/readArticle/" + this.props.blogId} style={{color:'inherit',textDecoration:'none'}}>
            <Card style={{margin:"10px"}}>
                <Card.Header>{this.props.blogTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.props.blogContent}
                    </Card.Text>
                </Card.Body>
                {/* <Card.Footer>{this.authorName}</Card.Footer> */}



            </Card>
        </Link>
      </div>
      )
  
    }
  
  }



class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data :[]
        }

        this.displayData = this.displayData.bind(this);


    }


    displayData(){

        var data = this.state.data;
        console.log(data)
        var BlogBannerList =[]

        for(var i=0;i<data.length; i++){
            console.log(data.title);
            var banner = <BlogBanner key={i} blogId={data[i]._id} blogTitle={data[i].title} authorName={"kk"} blogContent={data[i].subtitle}/>
            BlogBannerList.push(banner);
        }
        
        return BlogBannerList;
    }

    componentDidMount(){
        // console.log(this.props.getAuthToken());
        var requestOptions ={
            method : "GET",
            headers : {"Authorization" : "Bearer " + this.props.getAuthToken() }
        }

        fetch("/articles/getAll",requestOptions).then(response => response.json())
                                                .then(data => this.setState({data:data}));
    }



    render(){
        return (
            <React.Fragment>
            <PageHeader/>
            <br></br>
            <Container>
                <Card>
                    <Card.Header>Some Recommendations</Card.Header>
                    <Card.Body>    
                        {this.displayData()}
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>)


    }


}


export default HomePage