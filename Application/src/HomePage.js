import React,{ Component } from 'react'
import PageHeader from './templates'
import './LoginPage.css'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'   
import Row from 'react-bootstrap/Row'

var images = importAll(require.context('./../server/uploads'));
// console.log(images.keys());

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}




export class BlogBanner extends Component {

    render(){
    //   var imageStyle ={
    //     display:"inline"
    //   }
    //   var contentStyle = {

        
    //   }
  
      var imageid = this.props.userImage.split("\\")[1]
      console.log(imageid);

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
                <Card.Header style={{textAlign:'center'}}><h3>{this.props.blogTitle}</h3></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.props.blogContent}
                    </Card.Text>
                </Card.Body>
            <Card.Footer>
            <Row style={{pading:"5px"}}>
                <Col xs={8} md={11}>
                    {this.props.authorname}
                </Col>
                <Col xs={4} md={1}>
                   <Image style={{height:'40px'}}src={images[imageid]} rounded />
                </Col>
            </Row>
            </Card.Footer>
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
            var banner = <BlogBanner key={i} blogId={data[i]._id} userImage={data[i].userImage} blogTitle={data[i].title} authorname={data[i].authorname} blogContent={data[i].subtitle}/>
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

        fetch("/articles/getAll",requestOptions)
            .then(response => response.json())
            .then(data =>{
                if(data.message){
                    console.log(data.message);
                    this.props.history.push("/");
                }
                else{
                    this.setState({data:data});
                }
            })
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