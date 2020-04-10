const mongoose = require('mongoose') //creates an instance of mongoose class.On subsequent calls, same object is returned.


//creating schema for Users.
const Userschema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    userImage : {type: String , required : true},
    email : {type : String, required:true, 
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password : String,

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    
    followers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }],
    tags : [
        {
        type : String
        }
    ],
});



Userschema.methods.follow = function(id){
    
    if(this.following.indexOf(id) == -1){
        this.following.push(id);
    }    
        

    return this.save();
}

Userschema.methods.addFollower = function (foll) {
    this.followers.push(foll)        
}


//calling the model constructor on the Mongoose instance and setting 'user' as reference to our 'Userschema'.
module.exports =  mongoose.model('user',Userschema);

