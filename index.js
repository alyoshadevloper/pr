const express = require('express')
const exhbs = require('express-handlebars') 
const path = require('path')
const rIndex = require('./routes/index')
const rCourse = require('./routes/course')
const rCard= require('./routes/card')
const rAdd = require('./routes/add')
const app = express()
const port = process.env.PORT || 3000
/// Setting ENGINE-HANDLEBARS

const exbs = exhbs.create({
    defaultLayout : 'main',
    extname : 'hbs'
})

app.engine('hbs' , exbs.engine)
app.set('view engine' , 'hbs')
app.set('views' , path.join(__dirname , 'views'))

/// Setting STATIC-FOLDER

app.use(express.static(path.join(__dirname , 'public')))

/// Setting FRONT-END GET DATA

app.use(express.urlencoded({extended: true}))

/// Setting ROUTES

app.use(rIndex)
app.use('/course' , rCourse)
app.use('/card' , rCard)
app.use('/add' , rAdd)

/// Setting Starting SERVER

app.listen(port , () => {
    console.log(`server is running on 3001 port`);
})