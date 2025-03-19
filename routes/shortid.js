const handleShortUrl = require('../controllers/shortid')
const express = require('express');
const router = express.Router();


router.get('/',handleShortUrl);

module.exports = router