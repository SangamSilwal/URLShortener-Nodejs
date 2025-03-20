const express = require('express');
const {handleGenerateNewShortURL,GetSpecificURL,RedirectingTheURL} = require('../controllers/url')
const router = express.Router();
const URL = require('../models/url')



router.post("/",handleGenerateNewShortURL);
router.get("/get/url/:id",GetSpecificURL);
router.get("/:sid",RedirectingTheURL);


module.exports = router;