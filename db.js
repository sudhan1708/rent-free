const  mongoose  = require("mongoose");

var mongooseURL = 'mongodb+srv://sudhan:sudhan2000@cluster0.x95kr.mongodb.net/mern-rooms'

mongoose.connect(mongooseURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection = mongoose.connection;

connection.on('error' , ()=>{
    console.log('Mongo DB Connnection Failed');
})

connection.on('connected',()=>{
    console.log('Mongo DB Connection Successful');
})