const express = require('express')
const router = express.Router()

router.get('/', async (req,res)=>{
    res.render("index")
})

router.get("/signup",(req,res)=>{
    return res.render("sigup")
})
router.get("/login",(req,res)=>{
    return res.render("login")
})


module.exports = router