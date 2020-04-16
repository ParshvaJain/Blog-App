import React,{Component } from 'react'



class RSSFeed extends Component {

  constructor(props){
    
    super(props);
    this.state = {
      items : []
    };
  }

  async componentDidMount(){

    try{
      
      var req = new XMLHttpRequest();
      req.onreadystatechange = () => {

      if(req.readyState == 4 && req.status == 200){

        console.log("HERE");
        
        var root = req.responseXML.documentElement;
        // console.log("root",root);
        var channel = root.getElementsByTagName("channel")[0];
        var item_list = channel.getElementsByTagName("item");
        
        var list =[];

		    for(var i=0;i<item_list.length;i+=1){
                var curr_item = item_list[i];
                // console.log(curr_item.getElementsByTagName("content"));
			    var title = curr_item.getElementsByTagName("title")[0].firstChild.nodeValue;
          var link = curr_item.getElementsByTagName("link")[0].firstChild.nodeValue;
          
          
          list.push({'title' : title , 'link' : link});
        }

        this.setState({
          items : list
        });
      }
    }
    
    
    req.open("GET","https://cors-anywhere.herokuapp.com/https://medium.com/feed/invironment/tagged/food", true);
    req.send();  
  
  
  } 
  catch(error){
        console.log(error);
      }
    }

    render(){
      return (
        <div>
          Check out Medium's RSS Feed about Exciting Food : -
          <br/>
          <div>
            <br/>
          </div>
          {this.state.items.map(item => (
            <li key = {item.guid}>
              
              <a target = "_blank" rel = "" href = {item.link}>{item.title}</a>
              
              <br/>
              
            </li>
          ))}
        </div>
      );
          }

    }
    

export default RSSFeed;