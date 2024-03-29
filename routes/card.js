const express  = require('express')
const Card = require('../model/card')
const Course = require('../model/course')
const router = express.Router()

router.post('/add' , async (req, res) => {

    const db = await Course.getById(req.body.id)
    await Card.add(db , req.ip)
    res.redirect('/card')
})

router.delete('/remove/:id' , async (req,  res) => {
    // console.log(req.params.id);
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})


router.get('/' , async (req , res) => {
     
    const db = await Card.fetch(req.ip)
    const count = await Card.counts()
                   
                res.render('card' , {
                    title : "Korzina sahifa",
                    eCard: true,
                    courses : db.courses,
                    price : db.price,
                    count
                })
            
                

})

module.exports = router