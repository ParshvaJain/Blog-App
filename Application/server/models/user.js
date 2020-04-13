const mongoose = require('mongoose') //creates an instance of mongoose class.On subsequent calls, same object is returned.


//creating schema for Users.
const Userschema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    userImage : {type: String , required : true},
    email : {type : String, required:true, 
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password : String,

    
    tags : [
        {
        type : String
        }
    ],
});


//calling the model constructor on the Mongoose instance and setting 'user' as reference to our 'Userschema'.
module.exports =  mongoose.model('user',Userschema);

