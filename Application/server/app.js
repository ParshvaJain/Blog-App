const express = require('express');
const app = express();  //creating new express application. 
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const textrazor = require('textrazor');


//const cookieParser = require('cookie-parser'); //for creating and storing cookies
//const passport = require('passport');

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

//Sets up connection with the database
mongoose.connect('mongodb+srv://Parshva:'+process.env.MONGO_ATLAS_PW +'@cluster0-iyvxe.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
    .catch(err => {
          console.log(err);
    })

mongoose.Promise = global.Promise  //If we want to use mongoose in different position inside the codes it must be seen as global mode

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cookieParser());





app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});




app.use("/users",userRoutes);
app.use("/articles",articleRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             });
  });
  
  module.exports = app; //sets what u want to publicly expose