const express = require('express');
const URLroute = require('./routes/url');
const connectToMongoDB = require('./connect');
const shortUrlroute = require('./routes/shortid');

const app = express();

const PORT = 8001;

//db connection
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB connected"))
.catch((error) => console.log("OOPS ERROR IS: ",error))


app.use(express.json());
app.use("/url",URLroute);
app.use("/:shortId",shortUrlroute);

app.listen(PORT,() => console.log("Listening to the port 8001"));