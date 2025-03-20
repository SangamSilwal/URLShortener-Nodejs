const express = require('express');
const URLroute = require('./routes/url');
const connectToMongoDB = require('./connect');
const URL = require("./models/url")
const path = require('path')
const app = express();
const PORT = 8001;
const staticRoute = require('./routes/static')



//Connecting with the mongoDB database
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB connected"))
.catch((error) => console.log("OOPS ERROR IS: ",error))



//Serverside rendering using EJS
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



//Handling middelWare
app.use(express.json());
app.use(express.urlencoded({extended:false}))



app.use("/url",URLroute);
app.use("/",staticRoute)


app.listen(PORT,() => console.log("Listening to the port 8001"));