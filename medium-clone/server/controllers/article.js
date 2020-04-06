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

    const new_article = new Article({

        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        subtitle : req.body.subtitle,
        text:req.body.text,
        readingtime : req.body.readingtime,
        date : Date(),
        authorname:'5e8b8b99bd08442a0c357152'
    });

    new_article.save((err,article) => {
        if(err)
            res.send(err);

        else if (!article)
            res.send(400);
        else{
            console.log("there");
            return article.add_author(req.body.author_id).then(
                (_article) => {
                    return res.send(_article);
                }
            )
        }

    })}



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
        return res_article.add_comment({
            author : req.body.author_id,
            text : req.body.comment
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
    Article.findById(req.params.id).populate('authorname').populate('comments.authorname')
    .exec((err,art) => {
        if (err)
                res.send(err)
            else if (!art)
                res.send(404)
            else
                res.send(art)
    })
}





