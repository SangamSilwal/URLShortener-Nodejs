const shortid = require('shortid');
const URL = require('../models/url');
const express = require('express')



async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is required" });

    const shortID = shortid.generate();

    try {
        const newlyCreated = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.render("index", { newe: newlyCreated });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function GetSpecificURL(req,res)
{
    const url= req.params.id;
    const web = await URL.findOne({shortId: url});
    res.render("home",{allweb:web});
}


async function RedirectingTheURL (req,res)
{
    try {
        const shortid = req.params.sid;
        const redurl = await URL.findOneAndUpdate(
            {shortId:shortid},
            {$push: {visitHistory: {timestamp: Date.now()}}}
        );
        if(!redurl)
        {
            return res.status(404).json({error: "Short url not found"});
        }
        res.redirect(redurl.redirectURL);
    } catch (error) {
        console.error("SORRY ERROR: ",error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

module.exports = {
    handleGenerateNewShortURL,
    GetSpecificURL,
    RedirectingTheURL,
}