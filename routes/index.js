const express  = require('express')
const Course = require('../model/course')
const Card = require('../model/card')
const router = express.Router()

router.get('/' , async (req , res) => {
    console.log(req.ip);
     const db =  await Course.sortByTop()
     const count = await Card.counts()
   
    res.render('index' , {
        title : "Bosh sahifa",
        eIndex : true,
        data : db,
        count
    })
})

module.exports = router