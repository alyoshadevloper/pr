const express  = require('express')
const Course = require('../model/course')
const Card = require('../model/card')
const router = express.Router()

router.get('/' ,  async (req , res) => {
    const count = await Card.counts()
    res.render('add' , {
        title : "Kurslar qoshish sahifasi",
        eAdd : true,
        count
    })
})

router.post('/' , async (req , res) => {
        // console.log(req.body);
        const course  = new Course(req.body.title , req.body.price , req.body.comment , req.body.category , req.body.img , req.body.top)
        await course.save()
        res.redirect('/course')

})

module.exports = router