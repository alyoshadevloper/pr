const express  = require('express')
const Course = require('../model/course')
const Card = require('../model/card')
const router = express.Router()

// GET DATA FOR FRONT-END

router.get('/' , async (req , res) => {
    const db =  await Course.getAll()
    const count = await Card.counts()
    res.render('course' , {
        title : "Kurslar sahifa",
        eCourse : true,
        data  : db,
        count
    })
})

// UPDATE DATA MEHTOD GET 

router.get("/:id/edit" , async (req  , res) => {
    // console.log(req.query);
    // console.log(req.params);
    if(!req.query.allow){
        return res.redirect('/')
    }
    const db =  await Course.getById(req.params.id)
    res.render('courseEdit.hbs' , {
        title : 'Malumotlarni ozgartirish',
        db 
    })
})

// UPDATE DATA MEHTOD POST 

router.post('/edit' ,  async (req , res) => {
    await Course.update(req.body)
    res.redirect('/course')

})

// DELETE DATA 

router.get('/delete/:id' , async (req , res) => {
    await Course.delete(req.params.id)
    res.redirect('/course')

})

// SEARCHING DATA

router.get('/sort' ,  async (req , res) => {

    const db  = await Course.sortByTitle(req.query.search)
    res.render("course" , {
        title : "Kurslar sahifa",
        eCourse : true,
        data  : db
    })
     
})

// GET ID FOR ONE CARD

router.get('/:id' , async (req , res) => {
    // console.log(req.params);
    const db =  await Course.getById(req.params.id)
    res.render('courses' , {
        title : "Kurs haqida",
        eCourse : true,
        data : db 
    })

})


module.exports = router