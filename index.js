const express = require('express');
const URLroute = require('./routes/url');
const connectToMongoDB = require('./connect');
const URL = require("./models/url")

const app = express();

const PORT = 8001;


connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB connected"))
.catch((error) => console.log("OOPS ERROR IS: ",error))


app.use(express.json());
app.use("/url",URLroute);


app.get("/:sid",async (req,res) =>{
    try {
        const shortid = req.params.sid;

        const redurl = await URL.findOneAndUpdate(
            { shortId:shortid },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        if (!redurl) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        console.log("The problem: \n")
        console.log(redurl)
        res.redirect(redurl.redirectURL); 
    } catch (error) {
        console.error("Error handling short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT,() => console.log("Listening to the port 8001"));