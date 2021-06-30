const express = require("express")
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const notificationRoute = require('./routes/notification');
const fetchUser = require('./routes/fetchUser');
const bodyParser = require("body-parser");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},() =>{   
    console.log("Connected to DB")
});


//Middleware
app.use(express.json());

//Route middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/notifications',notificationRoute);
app.use('/api/users',fetchUser);

app.listen(3000,(req,res)=>{console.log('Server up and running')});