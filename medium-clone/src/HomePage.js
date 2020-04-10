import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

class BlogBanner extends Component {

    render(){
    //   var imageStyle ={
    //     display:"inline"
    //   }
      var contentStyle = {
        display:"inline-block"
        
      }
  
      return (
      <div>
        {/* <Image src={this.props.imagesrc} roundedCircle  style={imageStyle}/> */}
        <div style={contentStyle}>
          <h1>{this.props.blogTitle}</h1>
          <p>By-{this.props.authorName}</p>
          <p>{this.props.blogContent}</p>
        </div>
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
            var banner = <BlogBanner key={i} blogTitle={data[i].title} authorName={"kk"} blogContent={data[i].subtitle}/>
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
                    <Card.Body>    
                        {this.displayData()}
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>)


    }


}


export default HomePage