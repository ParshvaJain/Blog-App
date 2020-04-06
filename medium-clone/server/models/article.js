const mongoose = require('mongoose');  //creates an instance of mongoose class.On subsequent calls, same object is returned.

//creating schema for Articles.

let Articleschema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : String,
    subtitle : String,
    text : String,
    likes : {type : Number, default : 0 },
    
    comments:[
        {
            authorname : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
        text : String
        }
    ],
    
    authorname : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    
    date : Date,
    readingtime : String
});



Articleschema.methods.add_like = function(){
    this.likes++;
    return this.save();   //updates or insert
}

Articleschema.methods.add_comment = function(comment){
    this.comments.push(comment);
    return this.save();
}

Articleschema.methods.get_article = function(id){
    article.find({'authorname':id})
    .then(res => {
        return res;
    })
}

Articleschema.methods.add_author = function (author_id) {
    this.authorname = author_id
    return this.save()
}


//calling the model constructor on the Mongoose instance and setting 'article' as reference to our 'ArticleSchema'.
module.exports = mongoose.model('article',Articleschema);