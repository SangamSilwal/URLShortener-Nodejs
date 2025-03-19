const express = require('express');
const {handleGenerateNewShortURL} = require('../controllers/url')
const router = express.Router();
const URL = require('../models/url')



router.post("/",handleGenerateNewShortURL);
router.get("/get/url/:id",async (req,res) =>{
    const url = req.params.id;
    const web = await URL.findOne({shortId: url})
    res.send(web)

})



module.exports = router;