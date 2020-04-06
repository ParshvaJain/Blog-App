const mongoose = require('mongoose');
const User = require('../models/user'); 
const Article = require('../models/article');

const bcrypt =  require('bcryptjs');  //bcrypt - password hashing function
const jwt = require('jsonwebtoken');
//const passport = require("passport");

//var user_id =[];
const checkAuth = require('../middleware/check-auth');

exports.user_signup = (req,res,next) => {

    User.find({
        email : req.body.email
    })
    .exec()
    .then(old_user => {
    
        if(old_user.length >= 1){
        return res.status(409).json({
            message : "email exists"
        });
    }

    else{

        bcrypt.hash(req.body.password,10,(err,hash) => {     //10 - "saltRounds - "

            if(err){
                return res.status(500).json({
                    error:err
                });
            }
            else{
        
                const user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    email : req.body.email,
                    password : hash,
                    name : req.body.name
                });

                

                user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message : "User created successfully"
                    })
                });
            }
        });   
    
    }
    });
}

exports.user_login = (req,res,next) => {

    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            res.status(401).json({
                message : "Auth failed"
            });
        }

        bcrypt.compare(req.body.password,user[0].password,(err,result) => {     //result is boolean value

            if(err){
                res.status(401).json({
                    message : "Auth failed"
                });
            }

            if(result){

                //user_id.push(user[0]._id);
                //console.log(user_id);
                const token = jwt.sign({
                    email : req.body.email,
                    userid : user[0]._id
                },process.env.JWT_KEY,
                {
                    expiresIn : "1h"
                }
                )
                //successfully logged in
                return res.status(200).json({
                    message : "Login successfull",
                    token : token
                })
            }

            res.status(401).json({
                message : "Auth failed"
            });
        });       
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    });   
}



exports.follow_user = (req,res,next) => {
    User.findById(req.body.userId)
    .then((user) => {
        return user.follow(req.body.user_id)
        .then(() => {
            return res.status(200).json({
                message:"followed successfully"
            });
        });
    })
}

exports.getUser = (req,res,next) => {
    User.findById(req.params.userId).then((err,user) => {
        if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
    })
}