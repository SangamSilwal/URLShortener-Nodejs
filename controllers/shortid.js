const URL = require('../models/url');
const express = require("express");


async function handleShortUrl(req,res) {
    const shortid = req.params.shortId;
    const redurl = await URL.findOneAndUpdate({
        shortid
    },{$push:{
        visitHistory: {
            timestamps: Date.now()
        }
    }})
    res.redirect(redurl.redirectURL);
}


module.exports = handleShortUrl