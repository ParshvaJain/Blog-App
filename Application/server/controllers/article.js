const Article = require('../models/article');  //importing articleSchema from models folder
const mongoose = require('mongoose');

//var user_controller = require('./user');

var User = require('../models/user');  //importing userSchema from models folder

//"exports" - allows us to reuse this function "createNewArticle" in other files
exports.create_new_article = (req,res,next) => {   
    
    //console.log(user_controller[0]);
    //console.log(ID);
    //var author_name;
    
    //User.findById(ID,function(err,item){
      //  author_name = item.name
    //});

    var user_id = req.body.authorId;


    User.findById(user_id,function(err,user) {
        
        if(err)
           return res.send(err);
        else if(!user)
            return res.sendStatus(400);
        else{

            user_image_path = user.userImage;

            const new_article = new Article({

                _id : new mongoose.Types.ObjectId(),
                title : req.body.title,
                subtitle : req.body.subtitle,
                text:req.body.text,
                readingtime : req.body.readingtime,
                date : Date(),
                authorname:req.body.authorName,
                userImage : user_image_path
            });


            new_article.save((err,article) => {
                if(err)
                    res.send(err);
        
                else if (!article)
                    res.send(400);
                else{
                    console.log("there");
                    return article;
                }
            })
        }
    });
   
}



exports.clap_article = (req,res,next) => {
    Article.findById(req.body.article_id)
    .then(res_article => {
        return res_article.add_like().then(() => {
            return res.status(200).json({
                message : "Like added"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
    })
}

exports.comment_article = (req,res,next) => {
    Article.findById(req.body.article_id)
    .then(res_article => {
        User.findById(req.body.author_id,function(err,user) {
            user_found = user.name;
            return res_article.add_comment({
                authorname : user_found,
                text : req.body.comment
            })
        })
        
        .then(() => {
            return res.status(200).json({
                message : "Comment added"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
    })
}



exports.get_article = (req,res,next) => {
    Article.findById(req.params.id)
    .exec((err,art) => {
        if (err)
                res.send(err)
            else if (!art)
                res.sendStatus(404)
            else
                res.send(art)
    })
}

exports.get_all_article = (req,res,next) => {

    console.log("in get_all");
    Article.find({})
    .exec((err,articles) => {

        if(err)
            res.send(err);
        else if (!articles)
            res.sendStatus(404);
        else   
            res.send(articles);        
    })
}




